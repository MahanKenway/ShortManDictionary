import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slangEntries, getRandomEntry } from "@/data/slangData";
import Header from "@/components/dictionary/Header";
import AlphabetSidebar from "@/components/dictionary/AlphabetSidebar";
import EntryCard from "@/components/dictionary/EntryCard";
import CategoryFilter from "@/components/dictionary/CategoryFilter";
import FavoritesPanel from "@/components/dictionary/FavoritesPanel";

const FAVORITES_KEY = "shortman_favorites";

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("shortman_dark") === "true" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [brainrotMode, setBrainrotMode] = useState(false);
  const [activeTab, setActiveTab] = useState("dictionary");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [displayedEntries, setDisplayedEntries] = useState(slangEntries);
  const [highlightedId, setHighlightedId] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }
    catch { return []; }
  });
  const [searchActive, setSearchActive] = useState(false);

  const mainRef = useRef(null);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("shortman_dark", String(darkMode));
  }, [darkMode]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Filter logic
  useEffect(() => {
    if (searchActive) return;
    let entries = slangEntries;
    if (activeLetter) {
      entries = entries.filter(e => e.word[0].toUpperCase() === activeLetter);
    }
    if (activeCategory !== "all") {
      entries = entries.filter(e => e.category.includes(activeCategory));
    }
    setDisplayedEntries(entries);
  }, [activeLetter, activeCategory, searchActive]);

  const handleSearch = (query) => {
    if (!query) {
      setSearchActive(false);
      return;
    }
    setSearchActive(true);
    const q = query.toLowerCase();
    const results = slangEntries.filter(e =>
      e.word.toLowerCase().includes(q) ||
      e.meaning.toLowerCase().includes(q)
    );
    setDisplayedEntries(results);
  };

  const handleSelectEntry = (entry) => {
    setSearchActive(false);
    setActiveLetter(null);
    setActiveCategory("all");
    setActiveTab("dictionary");
    setDisplayedEntries([entry, ...slangEntries.filter(e => e.id !== entry.id)]);
    setHighlightedId(entry.id);
    setTimeout(() => setHighlightedId(null), 3000);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRandom = () => {
    const entry = getRandomEntry();
    handleSelectEntry(entry);
  };

  const handleLetterSelect = (letter) => {
    setActiveLetter(letter);
    setSearchActive(false);
    setActiveCategory("all");
  };

  const handleCategorySelect = (cat) => {
    setActiveCategory(cat);
    setActiveLetter(null);
    setSearchActive(false);
  };

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleFavoriteSelect = (entry) => {
    setActiveTab("dictionary");
    handleSelectEntry(entry);
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        brainrotMode={brainrotMode}
        onToggleBrainrot={() => setBrainrotMode(b => !b)}
        onSearch={handleSearch}
        onSelectEntry={handleSelectEntry}
        onRandom={handleRandom}
        favCount={favorites.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "dictionary" ? (
          <div className="flex gap-5">
            {/* Alphabet Sidebar */}
            <div className="hidden lg:block">
              <AlphabetSidebar
                activeLetter={activeLetter}
                onSelectLetter={handleLetterSelect}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0" ref={mainRef}>
              {/* Category Filter */}
              <div className="mb-5">
                <CategoryFilter
                  activeCategory={activeCategory}
                  onSelectCategory={handleCategorySelect}
                />
              </div>

              {/* Mobile Alphabet Scroll */}
              <div className="lg:hidden mb-5 overflow-x-auto">
                <div className="flex gap-1 pb-1">
                  <button
                    onClick={() => handleLetterSelect(null)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeLetter === null ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    ALL
                  </button>
                  {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => (
                    <button
                      key={l}
                      onClick={() => handleLetterSelect(l)}
                      className={`flex-shrink-0 w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                        activeLetter === l ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results count */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">
                  {searchActive ? `Search results:` : activeLetter ? `Letter ${activeLetter}:` : "All entries:"}
                  <span className="font-bold text-foreground ml-1">{displayedEntries.length} terms</span>
                </p>
                {brainrotMode && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">🧠💀 BRAINROT MODE ACTIVE</span>
                  </div>
                )}
              </div>

              {/* Entry Cards */}
              {displayedEntries.length > 0 ? (
                <motion.div layout className="space-y-5">
                  <AnimatePresence mode="popLayout">
                    {displayedEntries.map(entry => (
                      <EntryCard
                        key={entry.id}
                        entry={entry}
                        isFavorite={favorites.includes(entry.id)}
                        onToggleFavorite={toggleFavorite}
                        brainrotMode={brainrotMode}
                        isHighlighted={highlightedId === entry.id}
                      />
                    ))}
                  </AnimatePresence>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-6xl mb-4">🤔</div>
                  <h3 className="text-xl font-bold font-heading text-foreground mb-2">No slang found</h3>
                  <p className="text-muted-foreground text-sm">
                    Try a different letter, category, or search term.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <FavoritesPanel
            favorites={favorites}
            allEntries={slangEntries}
            onSelect={handleFavoriteSelect}
            onRemove={toggleFavorite}
          />
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm font-mono">
            📖 ShortMan Dictionary — Internet Slang Edition
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            For educational purposes. Touch grass occasionally. 🌿
          </p>
        </div>
      </footer>
    </div>
  );
}
