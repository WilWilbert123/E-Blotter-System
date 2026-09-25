CREATE INDEX idx_persons_name ON persons(last_name, first_name);
CREATE INDEX idx_blotter_cases_barangay ON blotter_cases(barangay_id);
CREATE INDEX idx_blotter_cases_status ON blotter_cases(status);
CREATE INDEX idx_blotter_cases_date ON blotter_cases(incident_date);\n