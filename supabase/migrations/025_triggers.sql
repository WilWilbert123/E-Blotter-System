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
