import { useState, useRef, useEffect } from "react";
import { Search, Shuffle, X } from "lucide-react";
import { slangData, getRandomEntry } from "@/data/slangData";

export default function SearchBar({ onSearch, onSelectEntry, onRandom }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 0) {
      const filtered = slangData
        .filter(entry => entry.word.toLowerCase().includes(val.toLowerCase()))
        .slice(0, 7);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
    onSearch(val);
  };

  const handleSelect = (entry) => {
    setQuery(entry.word);
    setShowSuggestions(false);
    onSelectEntry(entry);
  };

  const clearSearch = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch("");
    inputRef.current?.focus();
  };

  const handleRandom = () => {
    const entry = getRandomEntry();
    setQuery(entry.word);
    setShowSuggestions(false);
    onRandom(entry);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      handleSelect(suggestions[0]);
    }
    if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length > 0 && setShowSuggestions(true)}
            placeholder="Search slang... e.g. 'rizz', 'NPC', 'based'"
            className="w-full pl-12 pr-12 py-4 text-base rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all shadow-sm hover:shadow-md"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={handleRandom}
          title="Random Slang"
          className="flex items-center gap-2 px-4 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-all shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
        >
          <Shuffle className="w-4 h-4" />
          <span className="hidden sm:inline text-sm">Random</span>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-card border border-border rounded-xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((entry, i) => (
            <button
              key={entry.id}
              onClick={() => handleSelect(entry)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted text-left transition-colors border-b border-border/50 last:border-0"
            >
              <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="font-semibold text-foreground">{entry.word}</span>
                <span className="text-muted-foreground text-sm ml-2 truncate">— {entry.meaning.substring(0, 50)}...</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground flex-shrink-0">
                {entry.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
