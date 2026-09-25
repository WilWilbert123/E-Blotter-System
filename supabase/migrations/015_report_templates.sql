CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id), -- NULL means global template
  name VARCHAR(255) NOT NULL,
  description TEXT,
  configuration JSONB NOT NULL,
  created_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);\n