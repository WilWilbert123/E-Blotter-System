CREATE TABLE login_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id),
  success BOOLEAN DEFAULT false,
  ip_address VARCHAR(45),
  user_agent TEXT,
  session_id UUID,
  failure_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n