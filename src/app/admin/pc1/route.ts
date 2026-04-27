import { NextRequest } from "next/server";
import { PC1_REVISION_HTML } from "./data";

// Forzar runtime Node (no edge) y desactivar caché para que la auth se evalúe siempre.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REALM = "PC1 Revision · ASI0705 A701";

function unauthorized() {
  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${REALM}"`,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

export async function GET(req: NextRequest) {
  const expectedUser = process.env.PC1_USER;
  const expectedPass = process.env.PC1_PASS;

  if (!expectedUser || !expectedPass) {
    return new Response(
      "PC1 review not configured: missing PC1_USER / PC1_PASS env vars",
      { status: 503, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  const auth = req.headers.get("authorization");
  if (!auth || !auth.startsWith("Basic ")) {
    return unauthorized();
  }

  const decoded = Buffer.from(auth.slice("Basic ".length), "base64").toString("utf-8");
  const sep = decoded.indexOf(":");
  if (sep === -1) return unauthorized();
  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (user !== expectedUser || pass !== expectedPass) {
    return unauthorized();
  }

  return new Response(PC1_REVISION_HTML, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
