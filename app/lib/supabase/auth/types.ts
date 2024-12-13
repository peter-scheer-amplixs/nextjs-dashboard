import { User, AuthError } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  error: AuthError | null;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends SignInCredentials {
  metadata?: { [key: string]: any };
}