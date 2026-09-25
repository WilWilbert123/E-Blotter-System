CREATE TABLE person_transfers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  from_barangay_id UUID REFERENCES barangays(id),
  to_barangay_id UUID REFERENCES barangays(id),
  status transfer_status DEFAULT 'PENDING',
  reason TEXT,
  notes TEXT,
  initiated_by UUID REFERENCES user_profiles(id),
  verified_by UUID REFERENCES user_profiles(id),
  transfer_date TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);\n