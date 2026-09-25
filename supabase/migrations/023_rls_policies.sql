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
CREATE POLICY "Users can see their own barangay" ON barangays FOR SELECT USING (true);\n