"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Pause, Play, X, Loader2 } from "lucide-react";

type RecorderState = "idle" | "recording" | "paused" | "stopped" | "transcribing";

interface RecorderModalProps {
  open: boolean;
  onClose: () => void;
  onComplete: (transcript: string) => void;
}

/**
 * Pick a MIME type that the current browser supports.
 * Safari typically supports audio/mp4, Chrome/Firefox support audio/webm.
 */
function getSupportedMimeType(): string {
  const candidates = [
    "audio/webm;codecs=opus",
    "audio/webm",
    "audio/mp4",
    "audio/ogg;codecs=opus",
    "audio/ogg",
  ];
  for (const mime of candidates) {
    if (MediaRecorder.isTypeSupported(mime)) return mime;
  }
  return ""; // browser default
}

/**
 * Map MIME type to file extension for the API.
 */
function mimeToExt(mime: string): string {
  if (mime.includes("mp4")) return "mp4";
  if (mime.includes("ogg")) return "ogg";
  return "webm";
}

export default function RecorderModal({
  open,
  onClose,
  onComplete,
}: RecorderModalProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const mimeTypeRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Timer ────────────────────────────────────── */
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  /* ── Cleanup ──────────────────────────────────── */
  const stopStreams = useCallback(() => {
    mediaRecorderRef.current?.stream
      .getTracks()
      .forEach((t) => t.stop());
    mediaRecorderRef.current = null;
  }, []);

  useEffect(() => {
    if (!open) {
      setState("idle");
      setTranscript("");
      setError(null);
      setElapsed(0);
      stopStreams();
      stopTimer();
    }
  }, [open, stopStreams, stopTimer]);

  /* ── Transcription via server API ─────────────── */
  const transcribeAudio = useCallback(async (blob: Blob, ext: string) => {
    setState("transcribing");
    try {
      const formData = new FormData();
      formData.append("audio", blob, `recording.${ext}`);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = (await res.json()) as { text?: string; error?: string };

      if (!res.ok || !data.text) {
        setError(
          data.error || "Transcription failed. You can still edit the text below.",
        );
        setState("stopped");
        return;
      }

      setTranscript(data.text);
      setState("stopped");
    } catch {
      setError("Network error during transcription. You can still edit the text below.");
      setState("stopped");
    }
  }, []);

  /* ── Recording controls ───────────────────────── */
  const startRecording = async () => {
    setError(null);
    setElapsed(0);
    chunksRef.current = [];
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = getSupportedMimeType();
      mimeTypeRef.current = mime;

      const rec = mime
        ? new MediaRecorder(stream, { mimeType: mime })
        : new MediaRecorder(stream);

      mediaRecorderRef.current = rec;

      rec.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      // Collect data every second for reliability
      rec.start(1000);
      setState("recording");
      startTimer();
    } catch (err: any) {
      if (!window.isSecureContext || !navigator.mediaDevices) {
        setError(
          "Recording requires a secure connection (HTTPS). Since you are testing on mobile via IP address, the browser blocked the microphone. Provide an HTTPS link (like ngrok) or test on localhost.",
        );
      } else {
        setError(
          "Microphone permission was denied or not available. Please allow microphone access to record.",
        );
      }
      setState("idle");
    }
  };

  const pauseRecording = () => {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state === "recording") {
      rec.pause();
      stopTimer();
      setState("paused");
    }
  };

  const resumeRecording = () => {
    const rec = mediaRecorderRef.current;
    if (rec && rec.state === "paused") {
      rec.resume();
      startTimer();
      setState("recording");
    }
  };

  const stopRecording = () => {
    stopTimer();
    const rec = mediaRecorderRef.current;

    if (rec && rec.state !== "inactive") {
      rec.stop();
      rec.onstop = () => {
        stopStreams();
        const mime = mimeTypeRef.current || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mime });
        const ext = mimeToExt(mime);

        if (blob.size < 100) {
          setError("Recording was too short. Please try again.");
          setState("idle");
          return;
        }

        // Send to server for transcription
        void transcribeAudio(blob, ext);
      };
    } else {
      setState("stopped");
    }
  };

  const handleFinish = () => {
    onComplete(transcript.trim() || "(empty transcript)");
    onClose();
  };

  /* ── Pulse animation for recording indicator ─── */
  const pulseVariants: any = {
    recording: {
      scale: [1, 1.3, 1],
      opacity: [0.6, 1, 0.6],
      transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
    },
    idle: { scale: 1, opacity: 0.6 },
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
            {/* Header */}
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

            {/* Recording indicator + timer */}
            {(state === "recording" || state === "paused") && (
              <div className="flex items-center justify-center gap-3 mb-4">
                <motion.div
                  className="w-3 h-3 rounded-full bg-rose-500"
                  variants={pulseVariants}
                  animate={state === "recording" ? "recording" : "idle"}
                />
                <span className="text-lg font-mono font-semibold text-foreground tabular-nums">
                  {formatTime(elapsed)}
                </span>
                {state === "paused" && (
                  <span className="text-xs text-muted uppercase tracking-wider">
                    Paused
                  </span>
                )}
              </div>
            )}

            {/* Transcribing spinner */}
            {state === "transcribing" && (
              <div className="flex flex-col items-center gap-3 mb-4 py-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="w-8 h-8 text-[var(--accent)]" />
                </motion.div>
                <p className="text-sm text-muted">Transcribing your recording…</p>
              </div>
            )}

            {error && (
              <p className="text-sm text-rose-400/90 mb-3">{error}</p>
            )}

            {/* Controls */}
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

            {/* Transcript display & edit */}
            {(state === "stopped" || (transcript && state !== "transcribing")) && (
              <div className="mt-2">
                <p className="text-[11px] uppercase tracking-widest text-muted mb-2">
                  Transcript
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
