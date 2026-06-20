"use server";

import { createSupabaseClient } from "./db";

export interface AuthResult {
  success: boolean;
  error?: string;
}

export async function signUp(
  email: string,
  password: string,
): Promise<AuthResult> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signIn(
  email: string,
  password: string,
): Promise<AuthResult> {
  const supabase = createSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { success: false, error: error.message };
  return { success: true };
}

export async function signOut(): Promise<void> {
  const supabase = createSupabaseClient();
  await supabase.auth.signOut();
}
