import React from "react";
import { alphabet, slangEntries } from "@/data/slangData";

export default function AlphabetSidebar({ activeLetter, onSelectLetter }) {
  const lettersWithEntries = new Set(
    slangEntries.map(e => e.word[0].toUpperCase())
  );

  return (
    <nav className="w-14 flex-shrink-0">
      <div className="sticky top-6 bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
        <div className="py-2">
          <button
            onClick={() => onSelectLetter(null)}
            className={`w-full py-1.5 text-xs font-bold transition-colors ${
              activeLetter === null
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            ALL
          </button>
          {alphabet.map(letter => {
            const hasEntries = lettersWithEntries.has(letter);
            return (
              <button
                key={letter}
                onClick={() => hasEntries && onSelectLetter(letter)}
                className={`w-full py-1.5 text-sm font-semibold transition-all ${
                  activeLetter === letter
                    ? "bg-primary text-primary-foreground font-bold"
                    : hasEntries
                    ? "text-foreground hover:bg-muted hover:text-primary cursor-pointer"
                    : "text-border cursor-not-allowed"
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
