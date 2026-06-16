import { useEffect, useRef, useState } from "react";
import { X, Download, Copy, Check } from "lucide-react";

export default function ShareModal({ entry, onClose }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${entry.id}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = async () => {
    const card = cardRef.current;
    if (!card) return;
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(card, { scale: 2, useCORS: true, backgroundColor: null });
      const link = document.createElement("a");
      link.download = `shortman-${entry.id}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch {
      handleCopyLink();
    }
  };

  const categoryGrad = {
    "Gaming": "from-purple-600 to-indigo-600",
    "TikTok": "from-pink-600 to-rose-500",
    "Reddit": "from-orange-500 to-amber-500",
    "default": "from-blue-600 to-cyan-500",
  };
  const grad = categoryGrad[entry.category] || categoryGrad.default;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="font-heading font-bold text-lg text-foreground">Share this entry</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Meme card */}
        <div className="px-5 pb-2">
          <div
            ref={cardRef}
            className={`bg-gradient-to-br ${grad} rounded-xl p-6 text-white`}
          >
            <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-2">ShortMan Dictionary</div>
            <div className="text-3xl font-heading font-black mb-1">{entry.word}</div>
            <div className="text-sm opacity-80 mb-3 font-mono italic">{entry.pronunciation}</div>
            <div className="text-sm leading-relaxed opacity-95 mb-4 line-clamp-3">{entry.meaning}</div>
            <div className="bg-white/20 rounded-lg p-3 mb-3">
              <p className="text-xs opacity-90 italic">"{entry.examples[0]}"</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl">{entry.vibeRating}</span>
              <span className="text-xs opacity-70">shortman.dict</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-5 pb-5 pt-3">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-muted text-foreground font-medium text-sm hover:bg-border transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download Card
          </button>
        </div>
      </div>
    </div>
  );
}
