import { useState, useEffect, useCallback } from "react";
import { slangData, getEntriesByLetter, searchEntries } from "@/data/slangData";
import Header from "@/components/Header";
import AlphabetSidebar from "@/components/AlphabetSidebar";
import EntryCard from "@/components/EntryCard";
import CategoryFilter from "@/components/CategoryFilter";
import ShareModal from "@/components/ShareModal";
import AddSlangModal from "@/components/AddSlangModal";
import { base44 } from "@/api/base44Client";
import { Plus, Users } from "lucide-react";

export default function Dictionary() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("shortman-dark") === "true";
  });
  const [brainrotMode, setBrainrotMode] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("shortman-favorites") || "[]"); }
    catch { return []; }
  });
  const [activeTab, setActiveTab] = useState("dictionary");
  const [activeLetter, setActiveLetter] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedEntries, setDisplayedEntries] = useState(slangData);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [shareEntry, setShareEntry] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [userSlang, setUserSlang] = useState([]);
  const [activeTab2, setActiveTab2] = useState("official"); // "official" | "community"

  const refreshUserSlang = useCallback(() => {
    base44.entities.UserSlang.list("-created_date", 100)
      .then(setUserSlang)
      .catch((error) => {
        console.warn("Community entries are unavailable in this environment:", error);
        setUserSlang([]);
      });
  }, []);

  useEffect(() => {
    refreshUserSlang();
  }, [refreshUserSlang]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("shortman-dark", String(darkMode));
  }, [darkMode]);

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("shortman-favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Update displayed entries based on filters
  useEffect(() => {
    if (selectedEntry) {
      setDisplayedEntries([selectedEntry]);
      return;
    }

    let entries = slangData;

    if (searchQuery) {
      entries = searchEntries(searchQuery);
    } else if (activeLetter) {
      entries = getEntriesByLetter(activeLetter);
    }

    if (activeCategory !== "All" && !searchQuery) {
      const catMap = { "Gaming": "Gaming", "TikTok": "TikTok", "Reddit": "Reddit", "Meme Terms": "Meme" };
      entries = entries.filter(e =>
        e.category === catMap[activeCategory] ||
        e.tags.includes(catMap[activeCategory]?.toLowerCase())
      );
    }

    setDisplayedEntries(entries);
  }, [searchQuery, activeLetter, activeCategory, selectedEntry]);

  const handleSearch = useCallback((q) => {
    setSearchQuery(q);
    setSelectedEntry(null);
    setActiveLetter(null);
  }, []);

  const handleSelectEntry = useCallback((entry) => {
    setSelectedEntry(entry);
    setActiveTab("dictionary");
    setTimeout(() => {
      const el = document.getElementById(`entry-${entry.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  }, []);

  const handleRandom = useCallback((entry) => {
    setSelectedEntry(entry);
    setSearchQuery("");
    setActiveLetter(null);
    setActiveTab("dictionary");
  }, []);

  const handleLetterClick = useCallback((letter) => {
    setActiveLetter(letter);
    setSearchQuery("");
    setSelectedEntry(null);
  }, []);

  const handleCategoryChange = useCallback((cat) => {
    setActiveCategory(cat);
    setActiveLetter(null);
    setSearchQuery("");
    setSelectedEntry(null);
  }, []);

  const handleToggleFavorite = useCallback((id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  }, []);

  const favoriteEntries = slangData.filter(e => favorites.includes(e.id));

  const entriesToShow = activeTab === "favorites" ? favoriteEntries : displayedEntries;

  const getHeadingText = () => {
    if (activeTab === "favorites") return `Your Favorites (${favoriteEntries.length})`;
    if (selectedEntry) return selectedEntry.word;
    if (searchQuery) return `Results for "${searchQuery}"`;
    if (activeLetter) return `Letter ${activeLetter}`;
    if (activeCategory !== "All") return activeCategory;
    return "All Entries";
  };

  return (
    <div className={`min-h-screen bg-background ${brainrotMode ? "brainrot-mode" : ""}`}>
      <Header
        darkMode={darkMode}
        onToggleDark={() => setDarkMode(d => !d)}
        brainrotMode={brainrotMode}
        onToggleBrainrot={() => setBrainrotMode(b => !b)}
        favoritesCount={favorites.length}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearch={handleSearch}
        onSelectEntry={handleSelectEntry}
        onRandom={handleRandom}
      />

      <div className="max-w-screen-xl mx-auto px-4 py-6 flex gap-6">
        {/* Alphabet sidebar - hidden on mobile */}
        <aside className="hidden lg:block w-40 flex-shrink-0">
          <AlphabetSidebar activeLetter={activeLetter} onLetterClick={handleLetterClick} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Official / Community sub-tabs */}
          {activeTab === "dictionary" && (
            <div className="mb-5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex gap-1 bg-muted p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab2("official")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab2 === "official" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Official
                </button>
                <button
                  onClick={() => setActiveTab2("community")}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-1.5 ${activeTab2 === "community" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Community
                  {userSlang.length > 0 && <span className="px-1.5 py-0.5 rounded-full text-xs bg-primary/20 text-primary font-bold">{userSlang.length}</span>}
                </button>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                Add Slang
              </button>
            </div>
          )}

          {/* Heading + category filter row */}
          {activeTab === "dictionary" && activeTab2 === "official" && (
            <div className="mb-5 space-y-3">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-lg font-bold text-foreground">{getHeadingText()}</h2>
                <span className="text-sm text-muted-foreground">{entriesToShow.length} entries</span>
              </div>
              <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
            </div>
          )}

          {activeTab === "favorites" && (
            <div className="mb-5">
              <h2 className="text-lg font-bold text-foreground">{getHeadingText()}</h2>
            </div>
          )}

          {/* Community entries */}
          {activeTab === "dictionary" && activeTab2 === "community" && (
            <div className="space-y-4">
              {userSlang.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="text-5xl mb-4">—</div>
                  <h3 className="text-lg font-bold text-foreground mb-2">No community entries yet</h3>
                  <p className="text-muted-foreground text-sm mb-4">Be the first to add your slang!</p>
                  <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90">
                    <Plus className="w-4 h-4" /> Add the first one
                  </button>
                </div>
              ) : (
                userSlang.map(entry => (
                  <div key={entry.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h2 className="text-2xl font-black font-heading text-foreground">{entry.word}</h2>
                        {entry.pronunciation && <p className="text-sm text-muted-foreground font-mono italic">{entry.pronunciation}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-bold">Community</span>
                        <span className="text-2xl">{entry.vibeRating || "🔥"}</span>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{entry.partOfSpeech}</span>
                    <div className="dict-border-left pl-4 mt-2 mb-3">
                      <p className="text-sm leading-relaxed font-medium text-foreground">{entry.meaning}</p>
                    </div>
                    {entry.internetMeaning && <p className="text-sm text-muted-foreground mb-3">{entry.internetMeaning}</p>}
                    {entry.examples && (
                      <div className="flex gap-2">
                        <span className="text-primary font-bold text-sm">›</span>
                        <p className="text-sm italic text-foreground/80">{entry.examples}</p>
                      </div>
                    )}
                    {entry.whereYouSeeIt && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.whereYouSeeIt.split(",").map(p => (
                          <span key={p} className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{p.trim()}</span>
                        ))}
                      </div>
                    )}
                    {/* Upvote */}
                    <div className="mt-4 pt-3 border-t border-border/50 flex items-center gap-2">
                      <button
                        onClick={async () => {
                          try {
                            const newVotes = (entry.votes || 0) + 1;
                            await base44.entities.UserSlang.update(entry.id, { votes: newVotes });
                            refreshUserSlang();
                          } catch (error) {
                            console.warn("Could not upvote community entry:", error);
                          }
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground text-sm font-medium transition-all"
                      >
                        Upvote
                      </button>
                      <span className="text-sm font-bold text-foreground">{entry.votes || 0}</span>
                      <span className="text-xs text-muted-foreground">votes</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Mobile A-Z quick nav (official only) */}
          {activeTab2 === "official" && (
          <div className="lg:hidden mb-4 flex flex-wrap gap-1 overflow-x-auto pb-2">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(l => {
              const has = slangData.some(e => e.letter === l);
              return (
                <button
                  key={l}
                  onClick={() => has && handleLetterClick(l)}
                  disabled={!has}
                  className={`w-7 h-7 rounded text-xs font-bold transition-all flex-shrink-0 ${
                    activeLetter === l ? "bg-primary text-primary-foreground" :
                    has ? "bg-muted text-foreground hover:bg-accent" : "text-muted-foreground/30"
                  }`}
                >
                  {l}
                </button>
              );
            })}
          </div>
          )}

          {/* Official entries list */}
          {activeTab2 === "official" && (
            entriesToShow.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="text-5xl mb-4">{activeTab === "favorites" ? "—" : "—"}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {activeTab === "favorites" ? "No favorites yet" : "No results found"}
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm">
                  {activeTab === "favorites"
                    ? "Click the heart button on any entry to save it here for quick access."
                    : "Try searching for something else, or browse by letter."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {entriesToShow.map(entry => (
                  <EntryCard
                    key={entry.id}
                    entry={entry}
                    isFavorite={favorites.includes(entry.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onShare={setShareEntry}
                    brainrotMode={brainrotMode}
                  />
                ))}
              </div>
            )
          )}

          {/* Back to all button */}
          {(selectedEntry || activeLetter || searchQuery !== "") && activeTab === "dictionary" && activeTab2 === "official" && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => { setSelectedEntry(null); setActiveLetter(null); setSearchQuery(""); }}
                className="px-5 py-2.5 rounded-xl bg-muted text-muted-foreground hover:bg-border transition-colors text-sm font-medium"
              >
                ← Back to all entries
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-6 text-center">
        <p className="text-sm text-muted-foreground">
          ShortMan Dictionary — Internet Slang Edition • No cap, this is educational fr fr
        </p>
        <p className="text-xs text-muted-foreground/60 mt-1">
          {slangData.length} entries and counting
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Built by <span className="text-primary font-bold">Mahan Tavakoli</span> for the best teacher,{" "}
          <span className="font-bold">Arina Mahmoudi</span>
        </p>
      </footer>

      {/* Share modal */}
      {shareEntry && (
        <ShareModal entry={shareEntry} onClose={() => setShareEntry(null)} />
      )}

      {/* Add slang modal */}
      {showAddModal && (
        <AddSlangModal onClose={() => setShowAddModal(false)} onAdded={refreshUserSlang} />
      )}
    </div>
  );
}
