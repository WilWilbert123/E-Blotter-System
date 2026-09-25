-- Create indexes for performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_blotter_cases_barangay_id ON blotter_cases(barangay_id);
CREATE INDEX IF NOT EXISTS idx_blotter_cases_status ON blotter_cases(status);
CREATE INDEX IF NOT EXISTS idx_persons_last_name ON persons(last_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
