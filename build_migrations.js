const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n');
};

write('supabase/migrations/013_barangay_users.sql', "CREATE TABLE IF NOT EXISTS barangay_users (\n    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,\n    barangay_id UUID NOT NULL REFERENCES barangays(id) ON DELETE CASCADE,\n    PRIMARY KEY (user_id, barangay_id)\n);");

write('supabase/migrations/004_user_profiles.sql', "CREATE TABLE IF NOT EXISTS roles (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    name VARCHAR(50) NOT NULL UNIQUE,\n    description TEXT\n);\n\nCREATE TABLE IF NOT EXISTS user_profiles (\n    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,\n    role_id UUID NOT NULL REFERENCES roles(id),\n    username VARCHAR(255) UNIQUE NOT NULL,\n    first_name VARCHAR(255) NOT NULL,\n    last_name VARCHAR(255) NOT NULL,\n    is_active BOOLEAN DEFAULT true,\n    must_change_password BOOLEAN DEFAULT true,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/005_roles_permissions.sql', "CREATE TABLE IF NOT EXISTS permissions (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    name VARCHAR(100) NOT NULL UNIQUE,\n    description TEXT\n);\n\nCREATE TABLE IF NOT EXISTS role_permissions (\n    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,\n    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,\n    PRIMARY KEY (role_id, permission_id)\n);");

write('supabase/migrations/006_persons.sql', "CREATE TABLE IF NOT EXISTS persons (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    first_name VARCHAR(255) NOT NULL,\n    middle_name VARCHAR(255),\n    last_name VARCHAR(255) NOT NULL,\n    sex VARCHAR(10),\n    date_of_birth DATE,\n    contact_information TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/007_person_residences.sql', "CREATE TABLE IF NOT EXISTS person_residences (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,\n    barangay_id UUID NOT NULL REFERENCES barangays(id) ON DELETE CASCADE,\n    address_details TEXT,\n    is_current BOOLEAN DEFAULT true,\n    started_at DATE,\n    ended_at DATE,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/008_blotter_cases.sql', "CREATE TABLE IF NOT EXISTS blotter_cases (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    barangay_id UUID NOT NULL REFERENCES barangays(id),\n    case_number VARCHAR(100) NOT NULL UNIQUE,\n    incident_type incident_type NOT NULL,\n    status blotter_status DEFAULT 'PENDING',\n    incident_date TIMESTAMP WITH TIME ZONE NOT NULL,\n    location TEXT NOT NULL,\n    narrative TEXT NOT NULL,\n    remarks TEXT,\n    created_by UUID REFERENCES user_profiles(id),\n    updated_by UUID REFERENCES user_profiles(id),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/009_blotter_persons.sql', "CREATE TABLE IF NOT EXISTS blotter_persons (\n    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,\n    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,\n    involvement_type VARCHAR(50) NOT NULL,\n    PRIMARY KEY (blotter_id, person_id, involvement_type)\n);");

write('supabase/migrations/010_blotter_actions.sql', "CREATE TABLE IF NOT EXISTS blotter_actions (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,\n    action_taken TEXT NOT NULL,\n    action_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    performed_by UUID REFERENCES user_profiles(id)\n);");

write('supabase/migrations/011_blotter_attachments.sql', "CREATE TABLE IF NOT EXISTS blotter_attachments (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,\n    file_path TEXT NOT NULL,\n    file_name VARCHAR(255) NOT NULL,\n    file_type VARCHAR(100),\n    uploaded_by UUID REFERENCES user_profiles(id),\n    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/012_person_transfers.sql', "CREATE TABLE IF NOT EXISTS person_transfers (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,\n    from_barangay_id UUID REFERENCES barangays(id),\n    to_barangay_id UUID REFERENCES barangays(id),\n    reason TEXT NOT NULL,\n    status transfer_status DEFAULT 'PENDING',\n    initiated_by UUID REFERENCES user_profiles(id),\n    resolved_by UUID REFERENCES user_profiles(id),\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/014_account_recovery.sql', "CREATE TABLE IF NOT EXISTS account_recovery (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    user_id UUID NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,\n    status VARCHAR(50) DEFAULT 'PENDING',\n    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/017_audit_logs.sql', "CREATE TABLE IF NOT EXISTS audit_logs (\n    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),\n    action VARCHAR(100) NOT NULL,\n    entity_type VARCHAR(100) NOT NULL,\n    entity_id UUID,\n    actor_id UUID REFERENCES user_profiles(id),\n    barangay_id UUID REFERENCES barangays(id),\n    old_data JSONB,\n    new_data JSONB,\n    success BOOLEAN DEFAULT true,\n    failure_reason TEXT,\n    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP\n);");

write('supabase/migrations/023_rls_policies.sql', "-- Enable RLS\nALTER TABLE barangays ENABLE ROW LEVEL SECURITY;\nALTER TABLE blotter_cases ENABLE ROW LEVEL SECURITY;\nALTER TABLE persons ENABLE ROW LEVEL SECURITY;\nALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;\n\n-- Tenant Isolation for Blotter Cases\nCREATE POLICY \"Barangay users can only see their own blotters\"\nON blotter_cases FOR SELECT\nUSING (\n    barangay_id IN (\n        SELECT barangay_id FROM barangay_users WHERE user_id = auth.uid()\n    )\n    OR \n    EXISTS (\n        SELECT 1 FROM user_profiles up\n        JOIN roles r ON up.role_id = r.id\n        WHERE up.id = auth.uid() AND r.name LIKE 'POLICE%'\n    )\n);\n\nCREATE POLICY \"Barangay users can insert into their own barangay\"\nON blotter_cases FOR INSERT\nWITH CHECK (\n    barangay_id IN (\n        SELECT barangay_id FROM barangay_users WHERE user_id = auth.uid()\n    )\n);");

console.log('Populated real SQL migrations.');
