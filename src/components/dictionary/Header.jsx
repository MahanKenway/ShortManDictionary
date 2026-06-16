import React from "react";
import { Moon, Sun, Heart } from "lucide-react";
import SearchBar from "./SearchBar";
import BrainrotToggle from "./BrainrotToggle";

export default function Header({
  darkMode, onToggleDark,
  brainrotMode, onToggleBrainrot,
  onSearch, onSelectEntry, onRandom,
  favCount, activeTab, onTabChange
}) {
  return (
    <header className={`sticky top-0 z-40 border-b border-border transition-all duration-300 ${
      brainrotMode
        ? "bg-gradient-to-r from-purple-900/95 via-background/95 to-pink-900/95 backdrop-blur-md"
        : "bg-background/95 backdrop-blur-md"
    }`}>
      {/* Top bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div>
            <h1 className={`text-xl md:text-2xl font-black font-heading leading-none ${
              brainrotMode ? "text-white" : "text-foreground"
            }`}>
              <span className="text-primary">Short</span>
              <span>Man</span>
            </h1>
            <p className="text-xs text-muted-foreground font-mono hidden sm:block">Dictionary of Internet Slang</p>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 rounded-lg">
            <span className="text-xs font-bold text-primary">Gen-Z Edition</span>
            <span className="text-base">💀</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <BrainrotToggle active={brainrotMode} onToggle={onToggleBrainrot} />
          <button
            onClick={onToggleDark}
            className="p-2.5 rounded-xl bg-muted hover:bg-accent transition-colors"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-7xl mx-auto px-4 pb-3">
        <SearchBar
          onSearch={onSearch}
          onSelectEntry={onSelectEntry}
          onRandom={onRandom}
        />
      </div>

      {/* Tab bar */}
      <div className="max-w-7xl mx-auto px-4 pb-0 flex gap-1">
        <button
          onClick={() => onTabChange("dictionary")}
          className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 ${
            activeTab === "dictionary"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          📚 Dictionary
        </button>
        <button
          onClick={() => onTabChange("favorites")}
          className={`px-4 py-2.5 text-sm font-semibold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 ${
            activeTab === "favorites"
              ? "border-primary text-primary bg-primary/5"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          Favorites
          {favCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-xs bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400 font-bold">
              {favCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
