// Receives enquiry forms.
// To get enquiries by email, set these environment variables (e.g. in .env.local or on Vercel):
//   RESEND_API_KEY=...            (free account at resend.com)
//   INQUIRY_TO=you@yourdomain.com (where enquiries go)
//   INQUIRY_FROM="Addax Website <website@yourdomain.com>" (a sender on a domain verified in Resend)
// Without them, enquiries are only printed in the server log.

const clean = (v, max = 2000) => String(v ?? "").slice(0, max).trim();

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (body.website) return Response.json({ ok: true }); // honeypot

  const data = {
    name: clean(body.name, 120),
    email: clean(body.email, 200),
    phone: `${clean(body.dial, 6)} ${clean(body.phone, 40)}`.trim(),
    objective: clean(body.objective, 120),
    request: clean(body.request, 120),
    budget: clean(body.budget, 60),
    developer: clean(body.developer, 60),
    project: clean(body.project, 120),
    message: clean(body.message),
    page: clean(body.page, 200),
  };
  if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || data.phone.length < 7) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const lines = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  const { RESEND_API_KEY, INQUIRY_TO, INQUIRY_FROM } = process.env;

  if (!RESEND_API_KEY || !INQUIRY_TO) {
    console.log("[inquiry] (email not configured)\n" + lines);
    return Response.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: INQUIRY_FROM || "Addax Website <onboarding@resend.dev>",
      to: INQUIRY_TO.split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject: `New enquiry: ${data.name}${data.project ? ` – ${data.project}` : ""}`,
      text: lines,
    }),
  });
  if (!res.ok) {
    console.error("[inquiry] email failed", res.status, await res.text());
    return Response.json({ ok: false }, { status: 502 });
  }
  return Response.json({ ok: true });
}
