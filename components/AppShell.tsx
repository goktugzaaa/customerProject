"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  getWizardScreens,
  isPresentationMode,
} from "@/lib/presentationMode";
import ScreenRenderer from "./ScreenRenderer";
import PhoneFrame from "./PhoneFrame";
import LandingScreen from "./LandingScreen";
import HomeHubScreen from "./HomeHubScreen";
import HomeCruiseScreen from "./HomeCruiseScreen";
import HomeCongratsScreen from "./HomeCongratsScreen";
import NotificationScreen from "./NotificationScreen";
import {
  DailyHighlightList,
  DailyRecordScreen,
} from "./DailyHighlightScreens";
import {
  SurveyRatingsScreen,
  SurveyAmenitiesScreen,
  SurveySuggestionsScreen,
  ThankYouScreen,
} from "./SurveyScreens";
import RecorderModal from "./RecorderModal";
import BrandedHeader from "./BrandedHeader";
import BackNavButton from "./BackNavButton";
import PresentationEndScreen from "./PresentationEndScreen";
import { buildDemoEmailBody, type DemoPayload } from "@/lib/buildDemoEmail";
import { VIEWPORT_OUTER_HEX } from "@/lib/pageBackground";

type View =
  | "landing"
  | "homeHub"
  | "songWizard"
  | "notification"
  | "homeCruise"
  | "dailyList"
  | "dailyRecord"
  | "homeCongrats"
  | "survey1"
  | "survey2"
  | "survey3"
  | "thankYou"
  | "presentationEnd";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
};

const emailOk = (s: string) => /^\S+@\S+\.\S+$/.test(s.trim());

export default function AppShell() {
  const [view, setView] = useState<View>("landing");
  const [wizardStep, setWizardStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [songSetupComplete, setSongSetupComplete] = useState(false);
  const [dayTranscripts, setDayTranscripts] = useState<
    [string, string, string]
  >(["", "", ""]);
  const [recordDay, setRecordDay] = useState<1 | 2 | 3>(1);
  const [recorderOpen, setRecorderOpen] = useState(false);

  const [surveyRecommend, setSurveyRecommend] = useState("");
  const [surveyClean, setSurveyClean] = useState("");
  const [surveyStaff, setSurveyStaff] = useState("");
  const [surveyAmenities, setSurveyAmenities] = useState<string[]>([]);
  const [surveySuggestions, setSurveySuggestions] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const wizardScreens = useMemo(() => getWizardScreens(), []);
  const currentScreen = wizardScreens[wizardStep];
  const isLastWizardStep = wizardStep === wizardScreens.length - 1;

  const highlightsComplete =
    dayTranscripts[0] !== "" &&
    dayTranscripts[1] !== "" &&
    dayTranscripts[2] !== "";

  const completedDays: boolean[] = useMemo(
    () => dayTranscripts.map((t) => t !== "") as boolean[],
    [dayTranscripts],
  );

  const surveyUnlocked = highlightsComplete;

  const handleAnswer = useCallback(
    (val: string) => {
      if (!currentScreen) return;
      setAnswers((prev) => ({ ...prev, [currentScreen.id]: val }));
    },
    [currentScreen],
  );

  const wizardValid = useMemo(() => {
    if (!currentScreen) return false;
    const v = answers[currentScreen.id]?.trim() ?? "";
    if (currentScreen.type === "booking") {
      return v.length > 0 && termsAccepted;
    }
    if (currentScreen.requiresNonEmpty) {
      if (currentScreen.id === 6) return emailOk(v);
      return v.length > 0;
    }
    if (currentScreen.type === "buttons" || currentScreen.type === "profanity") {
      return !!answers[currentScreen.id];
    }
    return false;
  }, [answers, currentScreen, termsAccepted]);

  const goWizardNext = () => {
    if (!wizardValid) return;
    if (isLastWizardStep) {
      setSongSetupComplete(true);
      if (isPresentationMode) {
        setView("presentationEnd");
        return;
      }
      setView("notification");
      return;
    }
    setDirection(1);
    setWizardStep((s) => Math.min(s + 1, wizardScreens.length - 1));
  };

  const goWizardBack = () => {
    if (wizardStep === 0) {
      setView("homeHub");
      return;
    }
    setDirection(-1);
    setWizardStep((s) => Math.max(s - 1, 0));
  };

  const openSongWizard = () => {
    setDirection(1);
    setView("songWizard");
  };

  const finishRecording = (text: string) => {
    setDayTranscripts((prev) => {
      const next: [string, string, string] = [...prev];
      next[recordDay - 1] = text;
      return next;
    });
    if (recordDay < 3) {
      setRecordDay((d) => (d + 1) as 1 | 2 | 3);
      setView("dailyRecord");
    } else {
      setView("homeCongrats");
    }
  };

  const sendDemoMail = async () => {
    const payload: DemoPayload = {
      answers,
      dayTranscripts,
      survey: {
        recommend: surveyRecommend,
        cleanliness: surveyClean,
        staff: surveyStaff,
        amenities: surveyAmenities,
        suggestions: surveySuggestions,
      },
    };
    const text = buildDemoEmailBody(payload);
    const subject = "Cruise Demo";

    setEmailError(null);
    setEmailSending(true);
    try {
      const res = await fetch("/api/send-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, subject }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setEmailError(
          data.error ??
            "E-posta gönderilemedi. Lütfen tekrar deneyin veya yöneticiye bildirin.",
        );
        return;
      }
      resetAll();
    } catch {
      setEmailError(
        "Ağ hatası. İnternet bağlantınızı kontrol edip tekrar deneyin.",
      );
    } finally {
      setEmailSending(false);
    }
  };

  const resetAll = () => {
    setView("landing");
    setWizardStep(0);
    setAnswers({});
    setTermsAccepted(false);
    setSongSetupComplete(false);
    setDayTranscripts(["", "", ""]);
    setRecordDay(1);
    setSurveyRecommend("");
    setSurveyClean("");
    setSurveyStaff("");
    setSurveyAmenities([]);
    setSurveySuggestions("");
    setEmailError(null);
    setEmailSending(false);
  };

  const nextLabel =
    isPresentationMode && isLastWizardStep
      ? "DONE >"
      : currentScreen?.nextLabel === "done"
        ? "DONE >"
        : "NEXT >";

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden"
      style={{ backgroundColor: VIEWPORT_OUTER_HEX }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full opacity-[0.14] blur-[120px]"
          style={{ background: "var(--accent)" }}
        />
        <div
          className="absolute -bottom-[20%] -right-[15%] w-[50%] h-[50%] rounded-full opacity-[0.1] blur-[100px]"
          style={{
            background:
              "linear-gradient(135deg, #60a5fa 0%, #2563eb 55%, #1d4ed8 100%)",
          }}
        />
      </div>

      <PhoneFrame>
        <div className="h-full flex flex-col relative bg-[var(--background)]">
          {view !== "landing" && (
            <header className="shrink-0 z-20">
              <BrandedHeader />
            </header>
          )}
          <div
            className={
              view === "landing"
                ? "min-h-0 flex-1"
                : "flex min-h-0 flex-1 flex-col"
            }
          >
          <AnimatePresence mode="wait">
            {view === "landing" && (
              <motion.div
                key="landing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <LandingScreen onLetsGo={() => setView("homeHub")} />
              </motion.div>
            )}

            {view === "homeHub" && (
              <motion.div
                key="homeHub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <HomeHubScreen
                  songSetupComplete={songSetupComplete}
                  highlightsComplete={highlightsComplete}
                  surveyUnlocked={surveyUnlocked}
                  presentationMode={isPresentationMode}
                  onSongSetup={openSongWizard}
                  onDailyHighlight={() => {
                    if (!songSetupComplete) return;
                    setView("dailyList");
                  }}
                  onQuickSurvey={() => {
                    if (!surveyUnlocked) return;
                    setView("survey1");
                  }}
                />
              </motion.div>
            )}

            {view === "songWizard" && currentScreen && (
              <motion.div
                key="wizard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <div className="flex items-center justify-between px-5 pb-2 pt-2">
                  <BackNavButton onClick={goWizardBack} label="Back" />
                </div>
                <div className="flex-1 relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={wizardStep}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        duration: 0.35,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                      className="absolute inset-0"
                    >
                      <ScreenRenderer
                        data={currentScreen}
                        value={answers[currentScreen.id] ?? ""}
                        onChange={handleAnswer}
                        termsAccepted={termsAccepted}
                        onTermsChange={setTermsAccepted}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="p-5 pb-8">
                  <motion.button
                    type="button"
                    onClick={goWizardNext}
                    disabled={!wizardValid}
                    whileTap={wizardValid ? { scale: 0.97 } : undefined}
                    className={`w-full py-4 rounded-2xl font-semibold text-[15px] flex items-center justify-center gap-2 ${
                      wizardValid
                        ? "bg-[var(--accent)] text-white shadow-md active:brightness-95"
                        : "text-muted bg-[var(--surface-light)] cursor-not-allowed"
                    }`}
                  >
                    {nextLabel}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {view === "presentationEnd" && (
              <motion.div
                key="presentationEnd"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <PresentationEndScreen onRestart={resetAll} />
              </motion.div>
            )}

            {view === "notification" && (
              <motion.div
                key="notification"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <NotificationScreen
                  onAllow={() => setView("homeCruise")}
                  onNoThanks={() => setView("homeCruise")}
                />
              </motion.div>
            )}

            {view === "homeCruise" && (
              <motion.div
                key="homeCruise"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <HomeCruiseScreen
                  onOpenHub={() => setView("homeHub")}
                  onStartHighlight={() => setView("dailyList")}
                />
              </motion.div>
            )}

            {view === "dailyList" && (
              <motion.div
                key="dailyList"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full relative"
              >
                <DailyHighlightList
                  completedDays={completedDays}
                  onSelectDay={(d) => {
                    setRecordDay(d);
                    setView("dailyRecord");
                  }}
                  onBack={() =>
                    setView(songSetupComplete ? "homeCruise" : "homeHub")
                  }
                />
              </motion.div>
            )}

            {view === "dailyRecord" && (
              <motion.div
                key={`dailyRecord-${recordDay}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full relative"
              >
                <DailyRecordScreen
                  day={recordDay}
                  onStartRecording={() => setRecorderOpen(true)}
                  onBack={() => setView("dailyList")}
                />
                <RecorderModal
                  open={recorderOpen}
                  onClose={() => setRecorderOpen(false)}
                  onComplete={finishRecording}
                />
              </motion.div>
            )}

            {view === "homeCongrats" && (
              <motion.div
                key="homeCongrats"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <HomeCongratsScreen
                  onLetsGoSurvey={() => setView("survey1")}
                />
              </motion.div>
            )}

            {view === "survey1" && (
              <motion.div
                key="survey1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <SurveyRatingsScreen
                  recommend={surveyRecommend}
                  cleanliness={surveyClean}
                  staff={surveyStaff}
                  onChange={(field, v) => {
                    if (field === "recommend") setSurveyRecommend(v);
                    if (field === "cleanliness") setSurveyClean(v);
                    if (field === "staff") setSurveyStaff(v);
                  }}
                  onNext={() => setView("survey2")}
                />
              </motion.div>
            )}

            {view === "survey2" && (
              <motion.div
                key="survey2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <SurveyAmenitiesScreen
                  selected={surveyAmenities}
                  onToggle={(id) =>
                    setSurveyAmenities((prev) =>
                      prev.includes(id)
                        ? prev.filter((x) => x !== id)
                        : [...prev, id],
                    )
                  }
                  onNext={() => setView("survey3")}
                />
              </motion.div>
            )}

            {view === "survey3" && (
              <motion.div
                key="survey3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <SurveySuggestionsScreen
                  text={surveySuggestions}
                  onChange={setSurveySuggestions}
                  onSend={() => {
                    setEmailError(null);
                    setView("thankYou");
                  }}
                />
              </motion.div>
            )}

            {view === "thankYou" && (
              <motion.div
                key="thankYou"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full"
              >
                <ThankYouScreen
                  isSending={emailSending}
                  sendError={emailError}
                  onOk={() => {
                    void sendDemoMail();
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          {view !== "landing" && (
            <footer className="shrink-0 border-t border-[var(--surface-border)] bg-[var(--background)] px-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              <p className="text-center text-[9px] uppercase tracking-[0.3em] text-muted">
                Powered by SongZoo
              </p>
            </footer>
          )}
        </div>
      </PhoneFrame>
    </div>
  );
}
