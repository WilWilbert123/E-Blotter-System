CREATE TABLE system_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES user_profiles(id),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);\n