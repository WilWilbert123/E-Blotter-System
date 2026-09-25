CREATE TABLE IF NOT EXISTS blotter_cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    barangay_id UUID NOT NULL REFERENCES barangays(id),
    case_number VARCHAR(100) NOT NULL UNIQUE,
    incident_type incident_type NOT NULL,
    status blotter_status DEFAULT 'PENDING',
    incident_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    narrative TEXT NOT NULL,
    remarks TEXT,
    created_by UUID REFERENCES user_profiles(id),
    updated_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
