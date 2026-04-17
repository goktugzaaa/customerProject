import { screens, type Screen } from "./screens";

/**
 * Sunum / kısıtlı deploy için:
 * Vercel veya `.env.local` içinde `NEXT_PUBLIC_PRESENTATION_MODE=true` yapın.
 * Tam akışı açmak için değişkeni silin, `false` yapın veya production’da kapatın.
 */
export const isPresentationMode =
  process.env.NEXT_PUBLIC_PRESENTATION_MODE === "true";

/** Sunumda gösterilecek sihirbaz ekranı sayısı (screens dizisinin başından). */
export const PRESENTATION_WIZARD_STEP_COUNT = 5;

export function getWizardScreens(): Screen[] {
  if (!isPresentationMode) return screens;
  return screens.slice(0, PRESENTATION_WIZARD_STEP_COUNT);
}
