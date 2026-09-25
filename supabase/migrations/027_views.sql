-- Views for reporting
CREATE OR REPLACE VIEW blotter_summary_view AS
SELECT b.name AS barangay_name, c.status, COUNT(*) AS case_count
FROM blotter_cases c
JOIN barangays b ON c.barangay_id = b.id
GROUP BY b.name, c.status;\n