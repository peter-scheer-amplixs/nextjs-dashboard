// Config exports
export { supabase } from './config/client';
export { environment } from './config/environment';

// Auth exports
export { AuthService } from './auth/service';
export type { SignInCredentials, SignUpCredentials } from './auth/types';
export { AuthenticationError, SignUpError, SignOutError } from './auth/errors';

// Database exports
export { DatabaseService } from './database/service';
export type { QueryOptions } from './database/types';
export { DatabaseOperationError } from './database/errors';

// Hooks exports
export { useAuth } from './hooks/useAuth';
export { useSupabaseQuery } from './hooks/useSupabaseQuery';