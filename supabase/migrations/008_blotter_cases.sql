CREATE TABLE blotter_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  barangay_id UUID REFERENCES barangays(id) NOT NULL,
  case_number VARCHAR(100) NOT NULL,
  incident_type incident_type NOT NULL,
  status case_status DEFAULT 'DRAFT',
  incident_date TIMESTAMPTZ NOT NULL,
  filed_date TIMESTAMPTZ DEFAULT NOW(),
  location TEXT NOT NULL,
  narrative TEXT NOT NULL,
  remarks TEXT,
  created_by UUID REFERENCES user_profiles(id),
  updated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(barangay_id, case_number)
);\n