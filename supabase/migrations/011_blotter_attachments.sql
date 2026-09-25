CREATE TABLE IF NOT EXISTS blotter_attachments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    uploaded_by UUID REFERENCES user_profiles(id),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
