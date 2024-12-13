import { supabase } from '../config/client';
import { SignInCredentials, SignUpCredentials } from './types';
import { AuthenticationError, SignUpError, SignOutError } from './errors';

export class AuthService {
  static async signIn({ email, password }: SignInCredentials) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw new AuthenticationError(error.message);
      return data;
    } catch (error) {
      if (error instanceof AuthenticationError) throw error;
      throw new AuthenticationError('Failed to sign in');
    }
  }

  static async signUp({ email, password, metadata }: SignUpCredentials) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: metadata }
      });
      
      if (error) throw new SignUpError(error.message);
      return data;
    } catch (error) {
      if (error instanceof SignUpError) throw error;
      throw new SignUpError('Failed to sign up');
    }
  }

  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw new SignOutError(error.message);
    } catch (error) {
      if (error instanceof SignOutError) throw error;
      throw new SignOutError('Failed to sign out');
    }
  }

  static async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
}