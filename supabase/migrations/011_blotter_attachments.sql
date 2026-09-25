CREATE TABLE blotter_attachments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  file_path TEXT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  file_size INT NOT NULL,
  uploaded_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n