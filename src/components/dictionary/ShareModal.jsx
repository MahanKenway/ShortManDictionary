import React, { useRef } from "react";
import { X, Copy, Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ShareModal({ entry, onClose }) {
  const cardRef = useRef(null);

  const copyLink = () => {
    const text = `${entry.word} ${entry.vibeRating}\n\n"${entry.meaning}"\n\nExample: "${entry.examples[0]}"\n\n— ShortMan Dictionary`;
    navigator.clipboard.writeText(text);
  };

  const downloadCard = () => {
    if (!cardRef.current) return;
    const el = cardRef.current;
    const text = `${entry.word} ${entry.vibeRating}\n\n${entry.meaning}\n\nExample: "${entry.examples[0]}"`;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${entry.word.toLowerCase().replace(/\s+/g, "-")}-shortman.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md bg-card rounded-3xl shadow-2xl overflow-hidden border border-border"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h3 className="font-bold text-foreground font-heading text-lg">Share this slang</h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-muted transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meme Card Preview */}
        <div className="p-5">
          <div
            ref={cardRef}
            className="rounded-2xl p-6 share-card-preview text-white"
          >
            <div className="text-xs font-bold uppercase tracking-widest text-purple-300 mb-3">
              📖 ShortMan Dictionary
            </div>
            <div className="text-3xl font-black font-heading mb-1">{entry.word}</div>
            <div className="text-purple-300 text-sm italic mb-4">{entry.partOfSpeech}</div>
            <div className="text-4xl mb-4">{entry.vibeRating}</div>
            <p className="text-white/90 text-sm leading-relaxed mb-4">{entry.meaning}</p>
            <div className="bg-white/10 rounded-xl p-3 text-sm">
              <span className="text-purple-300 font-bold">Example: </span>
              <span className="italic text-white/90">&ldquo;{entry.examples[0]}&rdquo;</span>
            </div>
            <div className="mt-4 text-xs text-purple-400 font-mono">shortman-dictionary.app</div>
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={copyLink}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all active:scale-95"
            >
              <Copy className="w-4 h-4" />
              Copy Definition
            </button>
            <button
              onClick={downloadCard}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-muted text-foreground font-semibold text-sm hover:bg-accent transition-all active:scale-95 border border-border"
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
