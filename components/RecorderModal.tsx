"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Pause, Play, X } from "lucide-react";

type RecorderState = "idle" | "recording" | "paused" | "stopped";

interface RecorderModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (transcript: string) => void;
}

export default function RecorderModal({
  open,
  onClose,
  onComplete,
}: RecorderModalProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const stopStreams = useCallback(() => {
    mediaRecorderRef.current?.stream
      .getTracks()
      .forEach((t) => t.stop());
    mediaRecorderRef.current = null;
  }, []);

  const trySpeechFromMic = useCallback(() => {
    const SR =
      typeof window !== "undefined"
        ? (window as unknown as { SpeechRecognition?: typeof SpeechRecognition; webkitSpeechRecognition?: typeof SpeechRecognition }).SpeechRecognition ||
          (window as unknown as { webkitSpeechRecognition?: typeof SpeechRecognition }).webkitSpeechRecognition
        : undefined;
    if (!SR) return null;
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    return r;
  }, []);

  useEffect(() => {
    if (!open) {
      setState("idle");
      setTranscript("");
      setError(null);
      stopStreams();
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      recognitionRef.current = null;
    }
  }, [open, stopStreams]);

  const startRecording = async () => {
    setError(null);
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      mediaRecorderRef.current = rec;
      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      rec.start();
      setState("recording");

      const speech = trySpeechFromMic();
      if (speech) {
        let text = "";
        speech.onresult = (ev: SpeechRecognitionEvent) => {
          for (let i = ev.resultIndex; i < ev.results.length; i++) {
            text += ev.results[i][0].transcript;
          }
          setTranscript(text.trim());
        };
        speech.onerror = () => {
          /* non-fatal for POC */
        };
        try {
          speech.start();
          recognitionRef.current = speech;
        } catch {
          recognitionRef.current = null;
        }
      }
    } catch {
      setError("Microphone permission is required for this demo.");
      setState("idle");
    }
  };

  const pauseRecording = () => {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state === "recording") {
      rec.pause();
      try {
        recognitionRef.current?.stop();
      } catch {
        /* ignore */
      }
      setState("paused");
    }
  };

  const resumeRecording = () => {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state === "paused") {
      rec.resume();
      const speech = trySpeechFromMic();
      if (speech) {
        speech.onresult = (ev: SpeechRecognitionEvent) => {
          setTranscript((prev) => {
            let add = "";
            for (let i = ev.resultIndex; i < ev.results.length; i++) {
              add += ev.results[i][0].transcript;
            }
            return (prev + " " + add).trim();
          });
        };
        try {
          speech.start();
          recognitionRef.current = speech;
        } catch {
          recognitionRef.current = null;
        }
      }
      setState("recording");
    }
  };

  const stopRecording = () => {
    const rec = mediaRecorderRef.current;
    try {
      recognitionRef.current?.stop();
    } catch {
      /* ignore */
    }
    recognitionRef.current = null;

    if (rec && rec.state !== "inactive") {
      rec.stop();
      rec.onstop = () => {
        stopStreams();
        setState("stopped");
        setTranscript((t) =>
          t ||
          "This is the transcribed text from the voice recording (simulated — enable Chrome speech or speak after starting).",
        );
      };
    } else {
      setState("stopped");
    }
  };

  const handleFinish = () => {
    onComplete(transcript.trim() || "(empty transcript)");
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="absolute inset-0 z-30 flex items-end justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="w-full max-w-md m-4 mb-8 rounded-3xl border border-[var(--surface-border)] bg-[var(--background)] p-5 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-foreground">
                Voice recorder
              </span>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl text-muted hover:text-foreground"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {error && (
              <p className="text-sm text-rose-400/90 mb-3">{error}</p>
            )}

            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {state === "idle" && (
                <button
                  type="button"
                  onClick={startRecording}
                  className="flex items-center gap-2 rounded-2xl bg-[var(--accent)] px-5 py-3 font-medium text-white shadow-md active:brightness-95"
                >
                  <Mic className="w-4 h-4" />
                  Record
                </button>
              )}
              {state === "recording" && (
                <>
                  <button
                    type="button"
                    onClick={pauseRecording}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--surface-light)] text-foreground"
                  >
                    <Pause className="w-4 h-4" />
                    Pause
                  </button>
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/80 text-white"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                </>
              )}
              {state === "paused" && (
                <>
                  <button
                    type="button"
                    onClick={resumeRecording}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[var(--surface-light)] text-foreground"
                  >
                    <Play className="w-4 h-4" />
                    Record
                  </button>
                  <button
                    type="button"
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/80 text-white"
                  >
                    <Square className="w-4 h-4" />
                    Stop
                  </button>
                </>
              )}
            </div>

            {(state === "stopped" || transcript) && (
              <div className="mt-2">
                <p className="text-[11px] uppercase tracking-widest text-muted mb-2">
                  Transcript (POC)
                </p>
                <textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--surface)] border border-[var(--surface-border)] text-foreground text-sm"
                />
              </div>
            )}

            {state === "stopped" && (
              <button
                type="button"
                onClick={handleFinish}
                className="mt-4 w-full rounded-2xl bg-[var(--accent)] py-3 font-semibold text-white shadow-md active:brightness-95"
              >
                Save & continue
              </button>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
