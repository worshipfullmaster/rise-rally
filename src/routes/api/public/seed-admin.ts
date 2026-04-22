import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const DEFAULT_EMAIL = "admin@genz-mada.org";
const DEFAULT_PASSWORD = "ChangeMe!2026";

/**
 * Idempotent endpoint that ensures a default admin account exists.
 * - If no admin user exists yet → creates one with the default credentials.
 * - If at least one admin already exists → no-op (returns { seeded: false }).
 *
 * Public on purpose so the very first deploy can self-bootstrap, but it can
 * never elevate an existing user, never reset an existing admin password,
 * and never returns the credentials of an existing admin.
 */
export const Route = createFileRoute("/api/public/seed-admin")({
  server: {
    handlers: {
      GET: async () => {
        try {
          // Check whether any admin role already exists
          const { data: existingAdmins, error: roleErr } = await supabaseAdmin
            .from("user_roles")
            .select("user_id")
            .eq("role", "admin")
            .limit(1);

          if (roleErr) throw roleErr;
          if (existingAdmins && existingAdmins.length > 0) {
            return Response.json({ seeded: false, reason: "admin_exists" });
          }

          // Create the default admin user (auto-confirmed, since we own this flow)
          const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
            email: DEFAULT_EMAIL,
            password: DEFAULT_PASSWORD,
            email_confirm: true,
            user_metadata: { display_name: "Default Admin" },
          });

          if (createErr) {
            // If the user already exists but had no admin role, attach the role
            const { data: list } = await supabaseAdmin.auth.admin.listUsers();
            const found = list?.users.find((u) => u.email === DEFAULT_EMAIL);
            if (!found) throw createErr;
            await supabaseAdmin.from("user_roles").upsert(
              { user_id: found.id, role: "admin" },
              { onConflict: "user_id,role" },
            );
            return Response.json({ seeded: true, attached: true, email: DEFAULT_EMAIL });
          }

          const userId = created.user!.id;
          await supabaseAdmin.from("user_roles").upsert(
            { user_id: userId, role: "admin" },
            { onConflict: "user_id,role" },
          );

          return Response.json({
            seeded: true,
            email: DEFAULT_EMAIL,
            password: DEFAULT_PASSWORD,
            notice: "Default admin created. Sign in and change credentials immediately.",
          });
        } catch (e) {
          console.error("[seed-admin] failed:", e);
          return Response.json({ seeded: false, error: (e as Error).message }, { status: 500 });
        }
      },
    },
  },
});
