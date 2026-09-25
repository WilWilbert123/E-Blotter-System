CREATE TABLE IF NOT EXISTS person_residences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    barangay_id UUID NOT NULL REFERENCES barangays(id) ON DELETE CASCADE,
    address_details TEXT,
    is_current BOOLEAN DEFAULT true,
    started_at DATE,
    ended_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
