import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

const platformColors = {
  "TikTok": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  "Reddit": "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  "Discord": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
  "Gaming": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  "Twitter/X": "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300",
  "YouTube": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  "4chan": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  "Dating Apps": "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
};

export default function EntryCard({ entry, isFavorite, onToggleFavorite, onShare, brainrotMode }) {
  const [expanded, setExpanded] = useState(false);

  const meaning = brainrotMode ? entry.brainrotMeaning : entry.internetMeaning;

  return (
    <div
      id={`entry-${entry.id}`}
      className="entry-card bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      {/* Colored top bar */}
      <div className={`h-1 w-full ${
        entry.category === "Gaming" ? "bg-gradient-to-r from-purple-500 to-indigo-500" :
        entry.category === "TikTok" ? "bg-gradient-to-r from-pink-500 to-rose-500" :
        entry.category === "Reddit" ? "bg-gradient-to-r from-orange-500 to-amber-500" :
        "bg-gradient-to-r from-blue-500 to-cyan-500"
      }`} />

      <div className="p-5 sm:p-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 className={`entry-title text-2xl sm:text-3xl font-heading font-black text-foreground leading-tight ${brainrotMode ? "brainrot-mode" : ""}`}>
                {entry.word}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-mono uppercase tracking-wide">
                {entry.partOfSpeech.split("/")[0].trim()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 font-mono italic">
              {entry.pronunciation}
            </p>
          </div>
          <div className="vibe-badge text-2xl sm:text-3xl flex-shrink-0">{entry.vibeRating}</div>
        </div>

        {/* Part of speech full */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {entry.partOfSpeech}
          </span>
        </div>

        {/* Main meaning */}
        <div className="dict-border-left pl-4 mb-4">
          <p className="text-foreground text-sm sm:text-base leading-relaxed font-medium">
            {entry.meaning}
          </p>
        </div>

        {/* Internet Meaning */}
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            {brainrotMode ? "🧠💀 Brainrot Meaning" : "🌐 Internet Meaning"}
          </h3>
          <p className={`text-sm sm:text-base leading-relaxed text-muted-foreground ${brainrotMode ? "font-medium text-foreground/90" : ""}`}>
            {meaning}
          </p>
        </div>

        {/* Examples */}
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            💬 Example Sentences
          </h3>
          <div className="space-y-1.5">
            {entry.examples.map((ex, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-primary font-bold text-sm mt-0.5 flex-shrink-0">›</span>
                <p className="text-sm italic text-foreground/80 leading-relaxed whitespace-pre-line">{ex}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Where you see it */}
        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            👁️ Where You See It
          </h3>
          <div className="flex flex-wrap gap-2">
            {entry.whereYouSeeIt.map(platform => (
              <span
                key={platform}
                className={`text-xs px-2.5 py-1 rounded-full font-medium ${platformColors[platform] || "bg-muted text-muted-foreground"}`}
              >
                {platform}
              </span>
            ))}
          </div>
        </div>

        {/* Action row */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-1">
            <span className="text-xs text-muted-foreground">Vibe:</span>
            <span className="text-base">{entry.vibeRating}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(entry.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                isFavorite
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400"
                  : "bg-muted text-muted-foreground hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
              <span className="hidden sm:inline">{isFavorite ? "Saved" : "Save"}</span>
            </button>
            <button
              onClick={() => onShare(entry)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
