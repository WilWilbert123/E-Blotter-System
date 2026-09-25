CREATE TABLE report_exports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id),
  report_type VARCHAR(100) NOT NULL,
  filters JSONB,
  format VARCHAR(20) NOT NULL, -- PDF, EXCEL, CSV
  generated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n