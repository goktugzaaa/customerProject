"use client";

import { motion } from "framer-motion";

interface TextAreaProps {
  value?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
}

export default function TextArea({
  value,
  onChange,
  placeholder = "Share your story...",
}: TextAreaProps) {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4 }}
    >
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="
          w-full px-5 py-4
          bg-[var(--surface)]
          border border-[var(--surface-border)]
          rounded-2xl
          text-foreground text-base leading-relaxed
          placeholder:text-muted
          focus:outline-none
          focus:border-[var(--accent)]
          focus:bg-[var(--background)]
          transition-all duration-300
          resize-none
        "
      />
    </motion.div>
  );
}
