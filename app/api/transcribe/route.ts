import { NextResponse } from "next/server";

/**
 * POST /api/transcribe
 * Accepts a FormData with an `audio` file field.
 * Sends it to OpenAI Whisper for transcription and returns the text.
 */
export async function POST(request: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "OPENAI_API_KEY is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile || !(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: "No audio file provided." },
        { status: 400 },
      );
    }

    // Forward to OpenAI Whisper API
    const whisperForm = new FormData();
    whisperForm.append("file", audioFile, "recording.webm");
    whisperForm.append("model", "whisper-1");
    whisperForm.append("language", "en");

    const whisperRes = await fetch(
      "https://api.openai.com/v1/audio/transcriptions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        body: whisperForm,
      },
    );

    if (!whisperRes.ok) {
      const errBody = await whisperRes.text();
      console.error("Whisper API error:", whisperRes.status, errBody);
      return NextResponse.json(
        { error: "Transcription service failed. Please try again." },
        { status: 502 },
      );
    }

    const result = (await whisperRes.json()) as { text: string };
    return NextResponse.json({ text: result.text });
  } catch (err) {
    console.error("Transcription error:", err);
    return NextResponse.json(
      { error: "Internal server error during transcription." },
      { status: 500 },
    );
  }
}
