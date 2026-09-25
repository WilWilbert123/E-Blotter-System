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
