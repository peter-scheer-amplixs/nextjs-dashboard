import { createClient } from '@supabase/supabase-js';
import { environment, validateEnvironment } from './environment';

// Validate environment variables before creating client
validateEnvironment();

export const supabase = createClient(
  environment.supabase.url!,
  environment.supabase.anonKey!
);