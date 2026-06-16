import React, { useState } from "react";
import { Heart, Share2, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ShareModal from "./ShareModal";

const categoryColors = {
  gaming: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  tiktok: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  reddit: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  meme: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
};

const platformColors = {
  TikTok: "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Reddit: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300",
  Discord: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300",
  Gaming: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300",
  YouTube: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
};

export default function EntryCard({ entry, isFavorite, onToggleFavorite, brainrotMode, isHighlighted }) {
  const [expanded, setExpanded] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const displayMeaning = brainrotMode ? entry.brainrotMeaning : entry.internetMeaning;

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
          isHighlighted
            ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20"
            : "border-border hover:border-primary/30 hover:shadow-md"
        } ${brainrotMode ? "glitch-card" : ""}`}
      >
        {/* Entry Header */}
        <div className="p-5 pb-3">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap mb-1">
                <h2 className={`text-2xl md:text-3xl font-black font-heading text-foreground leading-tight ${brainrotMode ? "brainrot-active" : ""}`}>
                  {entry.word}
                </h2>
                <span className="text-2xl">{entry.vibeRating}</span>
              </div>
              <div className="entry-title-underline w-16 mb-2" />
              <p className="text-sm text-muted-foreground font-mono italic">{entry.pronunciation}</p>
              <p className="text-xs font-semibold text-primary uppercase tracking-widest mt-1">{entry.partOfSpeech}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onToggleFavorite(entry.id)}
                className={`p-2.5 rounded-xl transition-all active:scale-90 ${
                  isFavorite
                    ? "bg-red-100 text-red-500 dark:bg-red-900/30"
                    : "bg-muted text-muted-foreground hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={() => setShowShare(true)}
                className="p-2.5 rounded-xl bg-muted text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all active:scale-90"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {entry.category.map(cat => (
              <span key={cat} className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${categoryColors[cat] || "bg-muted text-muted-foreground"}`}>
                {cat}
              </span>
            ))}
          </div>

          {/* Meaning */}
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Definition</span>
            </div>
            <p className="text-foreground text-base leading-relaxed pl-4">{entry.meaning}</p>
          </div>

          {/* Internet Meaning Preview */}
          <div className={`rounded-xl p-3.5 ${brainrotMode ? "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700" : "bg-muted"}`}>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{brainrotMode ? "🧠💀" : "🌐"}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {brainrotMode ? "Brainrot Explanation" : "Internet Meaning"}
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${brainrotMode ? "text-purple-900 dark:text-purple-100 font-medium" : "text-foreground"} ${expanded ? "" : "line-clamp-3"}`}>
              {displayMeaning}
            </p>
            {displayMeaning.length > 200 && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-primary font-semibold mt-2 hover:underline"
              >
                {expanded ? <><ChevronUp className="w-3 h-3" /> Show less</> : <><ChevronDown className="w-3 h-3" /> Read more</>}
              </button>
            )}
          </div>
        </div>

        {/* Examples & Where you see it */}
        <div className="px-5 pb-4">
          <div className="border-t border-border pt-3 mt-1">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">📝 Example sentences</p>
            <ul className="space-y-1.5">
              {entry.examples.map((ex, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary font-bold flex-shrink-0 mt-0.5">›</span>
                  <span className="italic">&ldquo;{ex}&rdquo;</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-border pt-3 mt-3">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">📍 Where you see it</p>
            <div className="flex flex-wrap gap-2">
              {entry.whereYouSeeIt.map(platform => (
                <span key={platform} className={`px-3 py-1 rounded-full text-xs font-bold ${platformColors[platform] || "bg-muted text-muted-foreground"}`}>
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {entry.relatedTerms && (
            <div className="border-t border-border pt-3 mt-3">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">🔗 Related terms</p>
              <div className="flex flex-wrap gap-1.5">
                {entry.relatedTerms.map(term => (
                  <span key={term} className="px-2.5 py-1 rounded-lg text-xs bg-accent text-accent-foreground border border-border font-medium">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {showShare && <ShareModal entry={entry} onClose={() => setShowShare(false)} />}
    </>
  );
}
