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
$$ LANGUAGE sql SECURITY DEFINER;\n