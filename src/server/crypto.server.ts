// Simple symmetric encryption for PAT storage. Uses GITHUB_PAT_SECRET runtime env var.
// AES-256-GCM via Node crypto (server-only).
import { randomBytes, createCipheriv, createDecipheriv, scryptSync } from "node:crypto";

function getKey(): Buffer {
  const secret = process.env.GITHUB_PAT_SECRET || process.env.SUPABASE_SERVICE_ROLE_KEY || "fallback-dev-key-change-me";
  return scryptSync(secret, "gz-hub-salt", 32);
}

export function encryptPat(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString("base64")}:${tag.toString("base64")}:${enc.toString("base64")}`;
}

export function decryptPat(blob: string): string {
  const parts = blob.split(":");
  if (parts.length !== 4 || parts[0] !== "v1") throw new Error("Invalid encrypted PAT format");
  const iv = Buffer.from(parts[1], "base64");
  const tag = Buffer.from(parts[2], "base64");
  const enc = Buffer.from(parts[3], "base64");
  const decipher = createDecipheriv("aes-256-gcm", getKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
}
