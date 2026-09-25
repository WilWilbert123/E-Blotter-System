CREATE TABLE IF NOT EXISTS blotter_persons (
    blotter_id UUID NOT NULL REFERENCES blotter_cases(id) ON DELETE CASCADE,
    person_id UUID NOT NULL REFERENCES persons(id) ON DELETE CASCADE,
    involvement_type VARCHAR(50) NOT NULL,
    PRIMARY KEY (blotter_id, person_id, involvement_type)
);
