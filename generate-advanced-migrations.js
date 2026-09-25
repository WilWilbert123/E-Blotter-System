const fs = require('fs');
const path = require('path');

const migrationsPath = path.join(__dirname, 'supabase', 'migrations');

const migrations = {
  '022_storage_policies.sql': `
-- We assume storage schema exists in Supabase.
-- Note: Replace with proper Supabase storage policies when deploying.
`,
  '023_rls_policies.sql': `
-- Enable RLS on all business tables
ALTER TABLE barangays ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE person_transfers ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_recovery ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Note: Proper RLS policies should check the authenticated user's role and barangay.
-- These are placeholders. Real policies will be complex and role-based.
CREATE POLICY "Super admins can see all barangays" ON barangays FOR SELECT USING (true);
CREATE POLICY "Users can see their own barangay" ON barangays FOR SELECT USING (true);
`,
  '024_functions.sql': `
-- Utility functions for security and RLS checks
CREATE OR REPLACE FUNCTION auth_user_role() RETURNS text AS $$
  SELECT roles.name 
  FROM user_profiles 
  JOIN roles ON user_profiles.role_id = roles.id 
  WHERE user_profiles.id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION auth_user_barangay() RETURNS uuid AS $$
  SELECT barangay_id 
  FROM barangay_users 
  WHERE user_id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;
`,
  '025_triggers.sql': `
-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_persons_modtime BEFORE UPDATE ON persons FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blotter_cases_modtime BEFORE UPDATE ON blotter_cases FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
`,
  '026_indexes.sql': `
CREATE INDEX idx_persons_name ON persons(last_name, first_name);
CREATE INDEX idx_blotter_cases_barangay ON blotter_cases(barangay_id);
CREATE INDEX idx_blotter_cases_status ON blotter_cases(status);
CREATE INDEX idx_blotter_cases_date ON blotter_cases(incident_date);
`,
  '027_views.sql': `
-- Views for reporting
CREATE OR REPLACE VIEW blotter_summary_view AS
SELECT b.name AS barangay_name, c.status, COUNT(*) AS case_count
FROM blotter_cases c
JOIN barangays b ON c.barangay_id = b.id
GROUP BY b.name, c.status;
`
};

for (const [filename, content] of Object.entries(migrations)) {
  fs.writeFileSync(path.join(migrationsPath, filename), content.trim() + '\\n');
}

console.log('Advanced migrations generated.');
