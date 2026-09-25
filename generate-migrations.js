const fs = require('fs');
const path = require('path');

const migrationsPath = path.join(__dirname, 'supabase', 'migrations');

const migrations = {
  '004_user_profiles.sql': `
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE permissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT
);

CREATE TABLE role_permissions (
  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role_id UUID REFERENCES roles(id) NOT NULL,
  username VARCHAR(255) UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  must_change_password BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE barangay_users (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  barangay_id UUID REFERENCES barangays(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, barangay_id)
);
`,
  '006_persons.sql': `
CREATE TABLE persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL,
  suffix VARCHAR(20),
  aliases TEXT[],
  sex VARCHAR(20),
  date_of_birth DATE,
  contact_information TEXT,
  current_barangay_id UUID REFERENCES barangays(id),
  notes TEXT,
  is_archived BOOLEAN DEFAULT false,
  created_by UUID REFERENCES user_profiles(id),
  updated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '007_person_residences.sql': `
CREATE TABLE person_residences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  barangay_id UUID REFERENCES barangays(id),
  address TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '008_blotter_cases.sql': `
CREATE TABLE blotter_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id) NOT NULL,
  case_number VARCHAR(100) NOT NULL,
  incident_type incident_type NOT NULL,
  status case_status DEFAULT 'DRAFT',
  incident_date TIMESTAMPTZ NOT NULL,
  filed_date TIMESTAMPTZ DEFAULT NOW(),
  location TEXT NOT NULL,
  narrative TEXT NOT NULL,
  remarks TEXT,
  created_by UUID REFERENCES user_profiles(id),
  updated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(barangay_id, case_number)
);
`,
  '009_blotter_persons.sql': `
CREATE TYPE involvement_type AS ENUM ('COMPLAINANT', 'RESPONDENT', 'VICTIM', 'WITNESS', 'OTHER');

CREATE TABLE blotter_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  involvement involvement_type NOT NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '010_blotter_actions.sql': `
CREATE TABLE blotter_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  action_taken TEXT NOT NULL,
  performed_by UUID REFERENCES user_profiles(id),
  action_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '011_blotter_attachments.sql': `
CREATE TABLE blotter_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  file_size INT NOT NULL,
  uploaded_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '012_person_transfers.sql': `
CREATE TABLE person_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  from_barangay_id UUID REFERENCES barangays(id),
  to_barangay_id UUID REFERENCES barangays(id),
  status transfer_status DEFAULT 'PENDING',
  reason TEXT,
  notes TEXT,
  initiated_by UUID REFERENCES user_profiles(id),
  verified_by UUID REFERENCES user_profiles(id),
  transfer_date TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '014_account_recovery.sql': `
CREATE TABLE account_recovery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  requested_by UUID REFERENCES user_profiles(id),
  approved_by UUID REFERENCES user_profiles(id),
  recovery_token_hash VARCHAR(255),
  status VARCHAR(50) DEFAULT 'PENDING', -- PENDING, APPROVED, COMPLETED, REJECTED
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '015_report_templates.sql': `
CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id), -- NULL means global template
  name VARCHAR(255) NOT NULL,
  description TEXT,
  configuration JSONB NOT NULL,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '016_report_exports.sql': `
CREATE TABLE report_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id),
  report_type VARCHAR(100) NOT NULL,
  filters JSONB,
  format VARCHAR(20) NOT NULL, -- PDF, EXCEL, CSV
  generated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '017_audit_logs.sql': `
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES user_profiles(id),
  action audit_action NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id UUID,
  barangay_id UUID REFERENCES barangays(id),
  old_data JSONB,
  new_data JSONB,
  ip_address VARCHAR(45),
  user_agent TEXT,
  success BOOLEAN DEFAULT true,
  failure_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '018_login_history.sql': `
CREATE TABLE login_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  success BOOLEAN DEFAULT false,
  ip_address VARCHAR(45),
  user_agent TEXT,
  session_id UUID,
  failure_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '019_sessions.sql': `
CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  is_revoked BOOLEAN DEFAULT false,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '020_notifications.sql': `
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`,
  '021_system_settings.sql': `
CREATE TABLE system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES user_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`
};

for (const [filename, content] of Object.entries(migrations)) {
  fs.writeFileSync(path.join(migrationsPath, filename), content.trim() + '\\n');
}

console.log('Migrations generated.');
