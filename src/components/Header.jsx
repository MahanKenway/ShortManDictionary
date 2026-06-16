import { useState } from "react";
import { Sun, Moon, Brain, Heart, BookOpen } from "lucide-react";
import SearchBar from "./SearchBar";
import WhyShortManModal from "./WhyShortManModal";

export default function Header({ darkMode, onToggleDark, brainrotMode, onToggleBrainrot, favoritesCount, activeTab, onTabChange, onSearch, onSelectEntry, onRandom }) {
  const [showWhy, setShowWhy] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
      {/* Top bar */}
      <div className="border-b border-border/50 bg-primary/5">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-primary" />
            <div>
              <h1 className="font-heading font-black text-foreground text-lg sm:text-xl leading-none">
                ShortMan Dictionary
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Internet Slang Edition • Est. 2024
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Brainrot toggle */}
            <button
              onClick={onToggleBrainrot}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                brainrotMode
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg brainrot-toggle-active"
                  : "bg-muted text-muted-foreground hover:bg-accent"
              }`}
              title="Toggle Brainrot Mode"
            >
              <Brain className="w-4 h-4" />
              <span className="hidden sm:inline">{brainrotMode ? "ON" : "Brainrot"}</span>
            </button>

            {/* Why ShortMan? */}
            <button
              onClick={() => setShowWhy(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
              title="Why ShortMan?"
            >
              <span className="hidden sm:inline">Why ShortMan?</span>
              <span className="sm:hidden">VS</span>
            </button>

            {/* Dark mode */}
            <button
              onClick={onToggleDark}
              className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {showWhy && <WhyShortManModal onClose={() => setShowWhy(false)} />}
        </div>
      </div>

      {/* Search bar */}
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <SearchBar onSearch={onSearch} onSelectEntry={onSelectEntry} onRandom={onRandom} />
      </div>

      {/* Tab bar */}
      <div className="max-w-screen-xl mx-auto px-4 pb-3 flex items-center gap-1">
        <button
          onClick={() => onTabChange("dictionary")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "dictionary" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Dictionary
        </button>
        <button
          onClick={() => onTabChange("favorites")}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === "favorites" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
          }`}
        >
          <Heart className="w-4 h-4" />
          Favorites
          {favoritesCount > 0 && (
            <span className="ml-1 text-xs bg-rose-500 text-white rounded-full px-1.5 py-0.5 leading-none">
              {favoritesCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
