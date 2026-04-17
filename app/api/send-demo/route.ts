import { Resend } from "resend";
import { NextResponse } from "next/server";

const MAX_BODY = 50_000;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.DEMO_EMAIL_TO?.trim();
  const from =
    process.env.EMAIL_FROM?.trim() ??
    "SongZoo Cruise Demo <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      {
        error:
          "E-posta sunucusu yapılandırılmamış. RESEND_API_KEY ve DEMO_EMAIL_TO ortam değişkenlerini ayarlayın.",
      },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek gövdesi." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { text, subject } = payload as { text?: unknown; subject?: unknown };
  const textBody = typeof text === "string" ? text : "";
  const subjectLine =
    typeof subject === "string" && subject.trim().length > 0
      ? subject.trim().slice(0, 200)
      : "Cruise Demo";

  if (!textBody.trim()) {
    return NextResponse.json({ error: "Boş e-posta gövdesi." }, { status: 400 });
  }

  if (textBody.length > MAX_BODY) {
    return NextResponse.json({ error: "Metin çok uzun." }, { status: 400 });
  }

  const resend = new Resend(apiKey);

  const { data, error } = await resend.emails.send({
    from,
    to: [to],
    subject: subjectLine,
    text: textBody,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message ?? "E-posta gönderilemedi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true as const, id: data?.id ?? null });
}
