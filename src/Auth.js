// auth.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ujwwjqqefxojwljfvvos.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVqd3dqcXFlZnhvandsamZ2dm9zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5MzI4NzI1MywiZXhwIjoyMDA4ODYzMjUzfQ.TQY7KqF5KbpdgHw03P4B99NFribjloHIdTICIe1zZpk';

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to sign in with Google
export async function signInWithGoogle() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: 'google',
  });
  return { user, session, error };
}

// Function to sign out
export async function signOut() {
  await supabase.auth.signOut();
}

// Function to check if a user is authenticated
export function checkAuthenticated() {
  const user = supabase.auth.user();
  return user !== null;
}
