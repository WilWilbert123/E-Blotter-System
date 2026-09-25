-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_persons_modtime BEFORE UPDATE ON persons FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_blotter_cases_modtime BEFORE UPDATE ON blotter_cases FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();\n