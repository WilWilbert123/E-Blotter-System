CREATE TABLE persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(100) NOT NULL,
  middle_name VARCHAR(100),
  last_name VARCHAR(100) NOT NULL,
  suffix VARCHAR(20),
  aliases TEXT[],
  sex VARCHAR(20),
  date_of_birth DATE,
  contact_information TEXT,
  current_barangay_id UUID REFERENCES barangays(id),
  notes TEXT,
  is_archived BOOLEAN DEFAULT false,
  created_by UUID REFERENCES user_profiles(id),
  updated_by UUID REFERENCES user_profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);\n