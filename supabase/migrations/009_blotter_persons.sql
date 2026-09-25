CREATE TYPE involvement_type AS ENUM ('COMPLAINANT', 'RESPONDENT', 'VICTIM', 'WITNESS', 'OTHER');

CREATE TABLE blotter_persons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blotter_id UUID REFERENCES blotter_cases(id) ON DELETE CASCADE,
  person_id UUID REFERENCES persons(id) ON DELETE CASCADE,
  involvement involvement_type NOT NULL,
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);\n