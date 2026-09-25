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
);\n