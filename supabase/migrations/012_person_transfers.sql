CREATE TABLE IF NOT EXISTS person_transfers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    from_barangay_id UUID REFERENCES barangays(id),
    to_barangay_id UUID REFERENCES barangays(id),
    reason TEXT NOT NULL,
    status transfer_status DEFAULT 'PENDING',
    initiated_by UUID REFERENCES user_profiles(id),
    resolved_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
