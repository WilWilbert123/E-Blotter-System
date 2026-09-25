const fs = require('fs');
const path = require('path');

const write = (p, content) => {
  const full = path.join(__dirname, p);
  fs.mkdirSync(path.dirname(full), { recursive: true });
  fs.writeFileSync(full, content.trim() + '\n');
};

write('supabase/migrations/022_storage_policies.sql', `
-- Setup storage bucket for evidence
INSERT INTO storage.buckets (id, name, public) VALUES ('secure_attachments', 'secure_attachments', false) ON CONFLICT DO NOTHING;

-- Enable RLS on storage objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Storage Policy: Users can upload attachments
CREATE POLICY "Users can upload attachments"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'secure_attachments' AND 
  auth.role() = 'authenticated'
);

-- Storage Policy: Users can view attachments based on role/tenant
CREATE POLICY "Users can view attachments"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'secure_attachments' AND 
  auth.role() = 'authenticated'
);
`);

write('supabase/migrations/024_functions.sql', `
-- Function to automatically log actions
CREATE OR REPLACE FUNCTION audit_action()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs (action, entity_type, entity_id, actor_id, new_data)
    VALUES (
        TG_OP,
        TG_TABLE_NAME,
        NEW.id,
        auth.uid(),
        row_to_json(NEW)::jsonb
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
`);

write('supabase/migrations/025_triggers.sql', `
-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS trigger_blotter_audit ON blotter_cases;
DROP TRIGGER IF EXISTS trigger_person_audit ON persons;

-- Create triggers
CREATE TRIGGER trigger_blotter_audit
AFTER INSERT OR UPDATE OR DELETE ON blotter_cases
FOR EACH ROW EXECUTE FUNCTION audit_action();

CREATE TRIGGER trigger_person_audit
AFTER INSERT OR UPDATE OR DELETE ON persons
FOR EACH ROW EXECUTE FUNCTION audit_action();
`);

write('supabase/migrations/026_indexes.sql', `
-- Create indexes for performance on frequently queried columns
CREATE INDEX IF NOT EXISTS idx_blotter_cases_barangay_id ON blotter_cases(barangay_id);
CREATE INDEX IF NOT EXISTS idx_blotter_cases_status ON blotter_cases(status);
CREATE INDEX IF NOT EXISTS idx_persons_last_name ON persons(last_name);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
`);

write('supabase/migrations/027_views.sql', `
-- Create a comprehensive view for reporting
CREATE OR REPLACE VIEW blotter_reports_view AS
SELECT 
    bc.id AS case_id,
    bc.case_number,
    bc.incident_type,
    bc.status,
    bc.incident_date,
    b.name AS barangay_name,
    up.first_name || ' ' || up.last_name AS reported_by
FROM blotter_cases bc
JOIN barangays b ON bc.barangay_id = b.id
LEFT JOIN user_profiles up ON bc.created_by = up.id;
`);

console.log('Populated advanced SQL migrations.');
