import { screens, type Screen } from "./screens";

/**
 * Sunum modu: varsayılan AÇIK (Vercel’de env eklemeyi unutsan da ilk 5 adım + kapanış).
 * Tam uygulamayı (tüm hub, anket, vb.) açmak için:
 * `.env.local` veya Vercel’de `NEXT_PUBLIC_PRESENTATION_MODE=false`
 */
export const isPresentationMode =
  process.env.NEXT_PUBLIC_PRESENTATION_MODE !== "false";

/** Sunumda gösterilecek sihirbaz ekranı sayısı (screens dizisinin başından). */
export const PRESENTATION_WIZARD_STEP_COUNT = 5;

export function getWizardScreens(): Screen[] {
  if (!isPresentationMode) return screens;
  return screens.slice(0, PRESENTATION_WIZARD_STEP_COUNT);
}
