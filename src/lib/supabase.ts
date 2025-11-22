import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper to check if a string is a valid URL
const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

// Create a safe client that won't crash the app if env vars are missing/invalid
export const supabase =
  supabaseUrl && supabaseAnonKey && isValidUrl(supabaseUrl)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : (new Proxy(
        {},
        {
          get: () => () => ({
            data: null,
            error: null,
            select: () => ({ data: [], error: null }),
          }),
        }
      ) as any);

if (!supabaseUrl || !supabaseAnonKey || !isValidUrl(supabaseUrl)) {
  console.warn(
    "Supabase credentials missing or invalid. App running in demo mode."
  );
}
