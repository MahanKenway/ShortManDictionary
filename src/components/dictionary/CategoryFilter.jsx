import React from "react";
import { categories } from "@/data/slangData";

const legacyCategories = categories.map((category) => ({
  label: category,
  value: category === "All" ? "all" : category,
}));

export default function CategoryFilter({ activeCategory = "all", onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filter:</span>
      {legacyCategories.map(({ label, value }) => (
        <button
          key={value}
          type="button"
          onClick={() => onSelectCategory(value)}
          className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${
            activeCategory === value
              ? "bg-primary/10 text-primary border-primary/30 shadow-sm"
              : "bg-card text-muted-foreground border-border hover:bg-muted"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
