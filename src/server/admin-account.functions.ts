import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function adminClient() {
  return createClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

async function assertAdmin(userId: string) {
  const admin = adminClient();
  const { data, error } = await admin
    .from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Admin role required");
}

/**
 * Update the currently authenticated admin's own email and/or password.
 * Requires the caller to already hold the admin role — never elevates anyone.
 */
export const updateAdminCredentials = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({
      newEmail: z.string().email().max(254).optional(),
      newPassword: z.string().min(10).max(200).optional(),
    }).refine((v) => v.newEmail || v.newPassword, { message: "Provide email or password" }).parse(d)
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const admin = adminClient();
    const updates: { email?: string; password?: string; email_confirm?: boolean } = {};
    if (data.newEmail) { updates.email = data.newEmail; updates.email_confirm = true; }
    if (data.newPassword) updates.password = data.newPassword;
    const { error } = await admin.auth.admin.updateUserById(context.userId, updates);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
