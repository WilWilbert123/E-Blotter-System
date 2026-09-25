import { createClient } from '@/lib/supabase/server';

export async function uploadEvidence(file: File, caseId: string) {
  const supabase = createClient();
  const path = `evidence/${caseId}/${Date.now()}_${file.name}`;
  
  const { data, error } = await supabase.storage.from('secure_attachments').upload(path, file);
  if (error) throw error;
  
  return data.path;
}\n