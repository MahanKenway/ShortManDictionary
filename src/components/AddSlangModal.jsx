import { useState } from "react";
import { X, Plus } from "lucide-react";
import { base44 } from "@/api/base44Client";

const VIBES = ["💀", "🔥", "😭", "👀", "💯", "🤡", "⚡", "🫡"];

export default function AddSlangModal({ onClose, onAdded }) {
  const [form, setForm] = useState({
    word: "", pronunciation: "", partOfSpeech: "noun",
    meaning: "", internetMeaning: "", examples: "",
    category: "Meme", whereYouSeeIt: "", vibeRating: "🔥"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.word.trim() || !form.meaning.trim()) {
      setError("Word and meaning are required.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await base44.entities.UserSlang.create(form);
      onAdded();
      onClose();
    } catch (err) {
      console.error("Failed to add community slang:", err);
      setError(err?.message || "Could not add this slang right now. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-xl font-black font-heading text-foreground">➕ Add Your Slang</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Word *</label>
              <input
                value={form.word}
                onChange={e => set("word", e.target.value)}
                placeholder="e.g. rizz"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Pronunciation</label>
              <input
                value={form.pronunciation}
                onChange={e => set("pronunciation", e.target.value)}
                placeholder="/rɪz/"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Part of Speech</label>
              <select
                value={form.partOfSpeech}
                onChange={e => set("partOfSpeech", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {["noun","verb","adjective","adverb","exclamation","phrase"].map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Meaning *</label>
              <textarea
                value={form.meaning}
                onChange={e => set("meaning", e.target.value)}
                placeholder="What does it mean?"
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Internet Meaning</label>
              <textarea
                value={form.internetMeaning}
                onChange={e => set("internetMeaning", e.target.value)}
                placeholder="How is it used online?"
                rows={2}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Example sentence</label>
              <input
                value={form.examples}
                onChange={e => set("examples", e.target.value)}
                placeholder="e.g. Bro has unreal rizz fr."
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={e => set("category", e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {["Gaming","TikTok","Reddit","Meme"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Vibe Rating</label>
              <div className="flex flex-wrap gap-1.5">
                {VIBES.map(v => (
                  <button
                    key={v} type="button"
                    onClick={() => set("vibeRating", v)}
                    className={`text-xl p-1.5 rounded-lg transition-all ${form.vibeRating === v ? "bg-primary/20 ring-2 ring-primary" : "hover:bg-muted"}`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Where you see it</label>
              <input
                value={form.whereYouSeeIt}
                onChange={e => set("whereYouSeeIt", e.target.value)}
                placeholder="e.g. TikTok, Twitter/X"
                className="w-full px-3 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-muted transition-colors text-sm font-medium"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="flex-1 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? "Saving..." : <><Plus className="w-4 h-4" /> Add Slang</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
