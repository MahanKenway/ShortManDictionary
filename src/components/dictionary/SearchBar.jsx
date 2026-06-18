import React, { useState, useRef, useEffect } from "react";
import { Search, X, Shuffle } from "lucide-react";
import { searchEntries } from "@/data/slangData";

export default function SearchBar({ onSearch, onSelectEntry, onRandom }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      const results = searchEntries(val).slice(0, 8);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      onSearch("");
    }
  };

  const handleSelect = (entry) => {
    setQuery(entry.word);
    setShowSuggestions(false);
    onSelectEntry(entry);
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch("");
    inputRef.current?.focus();
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
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto">
      <div className="relative flex items-center group">
        <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
        <input
          ref={inputRef}
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query && setShowSuggestions(true)}
          placeholder="Search slang terms... try 'rizz' or 'based'"
          className="w-full pl-12 pr-24 py-4 text-lg rounded-2xl border-2 border-border bg-card focus:border-primary focus:outline-none transition-all shadow-sm font-body placeholder:text-muted-foreground"
        />
        <div className="absolute right-3 flex items-center gap-2">
          {query && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onRandom}
            title="Random slang"
            className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-all active:scale-95"
          >
            <Shuffle className="w-4 h-4" />
            <span className="hidden sm:inline">Random</span>
          </button>
        </div>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
          {suggestions.map((entry, i) => (
            <button
              key={entry.id}
              onClick={() => handleSelect(entry)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors border-b border-border last:border-0"
            >
              <span className="text-xl">{entry.vibeRating.split("")[0]}</span>
              <div>
                <div className="font-bold text-foreground font-heading">{entry.word}</div>
                <div className="text-sm text-muted-foreground truncate max-w-xs">{entry.meaning}</div>
              </div>
              <div className="ml-auto flex gap-1">
                {(Array.isArray(entry.category) ? entry.category : [entry.category]).slice(0, 2).map(cat => (
                  <span key={cat} className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary font-medium">{cat}</span>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
