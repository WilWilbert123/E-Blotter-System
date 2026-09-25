CREATE TABLE IF NOT EXISTS blotter_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,
    action_taken TEXT NOT NULL,
    action_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    performed_by UUID REFERENCES user_profiles(id)
);
