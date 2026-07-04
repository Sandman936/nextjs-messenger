/** biome-ignore-all lint/style/noNonNullAssertion: Базовое создание клиента в supabase */
import { createBrowserClient } from "@supabase/ssr";
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_MESSENGER_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_MESSENGER_SUPABASE_PUBLISHABLE_KEY!,
);