-- Enable RLS
ALTER TABLE barangays ENABLE ROW LEVEL SECURITY;
ALTER TABLE blotter_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE persons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Tenant Isolation for Blotter Cases
CREATE POLICY "Barangay users can only see their own blotters"
ON blotter_cases FOR SELECT
USING (
    barangay_id IN (
        SELECT barangay_id FROM barangay_users WHERE user_id = auth.uid()
    )
    OR 
    EXISTS (
        SELECT 1 FROM user_profiles up
        JOIN roles r ON up.role_id = r.id
        WHERE up.id = auth.uid() AND r.name LIKE 'POLICE%'
    )
);

CREATE POLICY "Barangay users can insert into their own barangay"
ON blotter_cases FOR INSERT
WITH CHECK (
    barangay_id IN (
        SELECT barangay_id FROM barangay_users WHERE user_id = auth.uid()
    )
);
