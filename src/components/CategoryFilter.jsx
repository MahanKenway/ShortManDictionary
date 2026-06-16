import { categories } from "@/data/slangData";

const categoryColors = {
  "All": "bg-primary/10 text-primary border-primary/30",
  "Gaming": "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700",
  "TikTok": "bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-700",
  "Reddit": "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700",
  "Meme Terms": "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700",
};

const categoryIcons = {
  "All": "🌐",
  "Gaming": "🎮",
  "TikTok": "📱",
  "Reddit": "🤖",
  "Meme Terms": "😂",
};

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Filter:</span>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all
            ${activeCategory === cat
              ? categoryColors[cat] + " shadow-sm scale-105"
              : "bg-card text-muted-foreground border-border hover:bg-muted"
            }
          `}
        >
          <span>{categoryIcons[cat]}</span>
          <span>{cat}</span>
        </button>
      ))}
    </div>
  );
}
