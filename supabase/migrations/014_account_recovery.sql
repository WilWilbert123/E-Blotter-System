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
);\n