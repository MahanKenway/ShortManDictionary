import { X } from "lucide-react";

const reasons = [
  {
    icon: "⚡",
    title: "Speed of Light vs. a Turtle",
    longman: "Open the 1,952-page book, find the word, read 3 paragraphs of etymology... still searching.",
    shortman: "Type it, get the answer. Done. No cap.",
  },
  {
    icon: "🧠",
    title: "Definitions You Actually Get",
    longman: "\"Rizz (n.) — the quality of being charismatic in a romantic context, derived from charisma...\"",
    shortman: "\"Rizz = when people fall for you without you even trying. You either have it or you don't.\"",
  },
  {
    icon: "🌐",
    title: "Updated vs. a Museum Exhibit",
    longman: "Last time Longman added 'Skibidi'... never. It literally doesn't exist in there.",
    shortman: "New slang added constantly. Community writes it, everyone reads it. Living dictionary.",
  },
  {
    icon: "🎮",
    title: "Categories That Actually Matter",
    longman: "Literature, Formal, Academic, Business... *yawn*.",
    shortman: "Gaming, TikTok, Reddit, Meme — exactly where you actually live online.",
  },
  {
    icon: "🧩",
    title: "Brainrot Mode",
    longman: "Does not have it. Will never have it. Would resign before adding it.",
    shortman: "One button flips everything to max brainrot energy. Longman doesn't even know what brainrot means.",
  },
  {
    icon: "❤️",
    title: "Favorites & Community",
    longman: "You can dog-ear a page. That's literally it.",
    shortman: "Save favorites, vote on words, submit your own slang. You're part of the dictionary!",
  },
  {
    icon: "🌙",
    title: "Dark Mode",
    longman: "White paper. 2AM. Eyes burning. Uninstalled.",
    shortman: "Dark mode on, eyes safe, vibes correct.",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    longman: "A 2kg book. Or a 100MB PDF that crashes your phone.",
    shortman: "Fully responsive. You can learn new slang while waiting in line.",
  },
  {
    icon: "👍",
    title: "Community Voting",
    longman: "A board of editors decides what's valid. Very democratic. (It's not.)",
    shortman: "Users upvote the best words. The internet decides what slaps. Pure democracy.",
  },
];

export default function WhyShortManModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-5 flex items-center justify-between rounded-t-2xl z-10">
          <div>
            <h2 className="text-xl font-black font-heading text-foreground">⚔️ ShortMan vs Longman</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Why is ShortMan better? Let us count the ways...</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Reasons */}
        <div className="p-5 space-y-4">
          {reasons.map((r, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <div className="bg-primary/10 px-4 py-2.5 flex items-center gap-2">
                <span className="text-xl">{r.icon}</span>
                <h3 className="font-bold text-foreground text-sm">{r.title}</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
                <div className="p-3 bg-red-50 dark:bg-red-900/10">
                  <p className="text-xs font-bold text-red-600 dark:text-red-400 mb-1">❌ Longman</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{r.longman}</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900/10">
                  <p className="text-xs font-bold text-green-600 dark:text-green-400 mb-1">✅ ShortMan</p>
                  <p className="text-xs text-foreground leading-relaxed">{r.shortman}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Verdict */}
          <div className="mt-6 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/30 p-5 text-center">
            <div className="text-4xl mb-2">★</div>
            <h3 className="font-black font-heading text-lg text-foreground mb-2">The Final Verdict</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Longman is a great dictionary — for 1978. But it's 2025 now. Internet language changes every single day,
              and <span className="font-bold text-foreground">ShortMan</span> is the only dictionary that actually keeps up.
            </p>
            <div className="inline-block rounded-xl bg-card border border-border px-5 py-3 text-sm">
              <p className="text-muted-foreground text-xs mb-1">Built by</p>
              <p className="font-black text-foreground text-base">Mahan Tavakoli</p>
              <p className="text-xs text-muted-foreground mt-1">
                Verified by the world's best teacher,{" "}
                <span className="font-bold text-primary">Arina Mahmoudi</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
