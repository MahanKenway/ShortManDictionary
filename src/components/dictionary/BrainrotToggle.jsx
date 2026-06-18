import React from "react";

export default function BrainrotToggle({ active = false, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={active}
      title="Toggle brainrot mode"
      className={`px-3 py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
        active
          ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
          : "bg-muted text-muted-foreground hover:bg-accent hover:text-foreground"
      }`}
    >
      🧠💀
      <span className="hidden sm:inline ml-1">Brainrot</span>
    </button>
  );
}
