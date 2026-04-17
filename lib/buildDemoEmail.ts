import { humourLabel, profanityLabel } from "@/lib/screens";

export interface DemoPayload {
  answers: Record<number, string>;
  dayTranscripts: [string, string, string];
  survey: {
    recommend: string;
    cleanliness: string;
    staff: string;
    amenities: string[];
    suggestions: string;
  };
}

function line(label: string, value: string) {
  return `${label}: ${value}`;
}

export function buildDemoEmailBody(payload: DemoPayload): string {
  const a = payload.answers;
  const title = a[1] ?? "";
  const artist = a[2] ?? "";
  const humour = humourLabel[a[3] ?? ""] ?? a[3] ?? "";
  const prof = profanityLabel[a[4] ?? ""] ?? a[4] ?? "";
  const names = a[5] ?? "";
  const email = a[6] ?? "";
  const booking = a[7] ?? "";

  const lines = [
    line("Song title", title),
    line("Musical artist", artist),
    line("Homour level", humour),
    line("Profanities", prof),
    line("First names", names),
    line("Email address", email),
    line("Booking ID", booking),
    "",
    line("Day 1", payload.dayTranscripts[0] || "(no transcript)"),
    line("Day 2", payload.dayTranscripts[1] || "(no transcript)"),
    line("Day 3", payload.dayTranscripts[2] || "(no transcript)"),
    "",
    "NOTE: Survey results do NOT need to be stored anywhere for this prototype.",
    line("Recommend (0-10)", payload.survey.recommend),
    line("Cleanliness (1-5)", payload.survey.cleanliness),
    line("Staff friendliness (1-5)", payload.survey.staff),
    line("Amenities used", payload.survey.amenities.join(", ") || "—"),
    line("Suggestions", payload.survey.suggestions || "—"),
  ];

  return lines.join("\n");
}
