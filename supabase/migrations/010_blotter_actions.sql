CREATE TABLE blotter_actions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  action_taken TEXT NOT NULL,
  performed_by UUID REFERENCES user_profiles(id),
  action_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n