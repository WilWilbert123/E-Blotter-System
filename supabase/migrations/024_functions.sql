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
