CREATE TABLE person_residences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  barangay_id UUID REFERENCES barangays(id),
  address TEXT NOT NULL,
  start_date DATE,
  end_date DATE,
  is_current BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n