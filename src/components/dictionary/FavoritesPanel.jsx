import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FavoritesPanel({ favorites, allEntries, onSelect, onRemove }) {
  const favoriteEntries = allEntries.filter(e => favorites.includes(e.id));

  if (favoriteEntries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4 float-anim">💔</div>
        <h3 className="text-xl font-bold font-heading text-foreground mb-2">No favorites yet</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Click the ❤️ button on any slang entry to save it here. Your favorites are stored locally.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <h2 className="text-xl font-bold font-heading text-foreground">Your Favorites</h2>
          <span className="px-2 py-0.5 rounded-full text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 font-bold">
            {favoriteEntries.length}
          </span>
        </div>
      </div>
      <div className="space-y-3">
        <AnimatePresence>
          {favoriteEntries.map(entry => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex items-center gap-3 bg-card rounded-xl p-4 border border-border hover:border-primary/30 transition-all group cursor-pointer"
              onClick={() => onSelect(entry)}
            >
              <span className="text-2xl">{entry.vibeRating.split("")[0]}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold font-heading text-foreground">{entry.word}</div>
                <div className="text-sm text-muted-foreground truncate">{entry.meaning}</div>
              </div>
              <button
                onClick={e => { e.stopPropagation(); onRemove(entry.id); }}
                className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
