import { createClient } from '@/lib/supabase/server';
import { Database } from '@/types/database.types';

export const getDb = () => {
  return createClient();
};\n