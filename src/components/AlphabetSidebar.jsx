import { alphabet, slangData } from "@/data/slangData";

export default function AlphabetSidebar({ activeLetter, onLetterClick }) {
  const lettersWithEntries = new Set(slangData.map(e => e.letter));

  return (
    <div className="flex flex-col gap-0.5 sticky top-4">
      <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 px-2">Browse A–Z</h2>
      {alphabet.map(letter => {
        const hasEntries = lettersWithEntries.has(letter);
        const isActive = activeLetter === letter;
        return (
          <button
            key={letter}
            onClick={() => hasEntries ? onLetterClick(letter) : null}
            disabled={!hasEntries}
            className={`
              px-3 py-1.5 rounded-lg text-sm font-bold transition-all text-left
              ${isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : hasEntries
                  ? "hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer"
                  : "text-muted-foreground/40 cursor-default"
              }
            `}
          >
            {letter}
            {hasEntries && (
              <span className={`ml-1.5 text-xs font-normal ${isActive ? "opacity-80" : "opacity-50"}`}>
                ({slangData.filter(e => e.letter === letter).length})
              </span>
            )}
          </button>
        );
      })}
      <button
        onClick={() => onLetterClick(null)}
        className="mt-2 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
      >
        Show all
      </button>
    </div>
  );
}
