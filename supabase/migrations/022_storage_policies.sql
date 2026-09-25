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
