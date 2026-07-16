import { FiClock, FiArrowRight } from "react-icons/fi";
import { formatDate } from "../utils/exportUtils.js";

export default function RecentSearches({ history, onSelect }) {
  if (!history?.length) return null;

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
        <FiClock size={16} /> Recent Searches
      </h3>
      <div className="space-y-1">
        {history.slice(0, 6).map((h) => (
          <button
            key={h._id}
            onClick={() => onSelect(h.username)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-paper-card dark:hover:bg-ink-card text-sm transition group"
          >
            <span className="font-mono">@{h.username}</span>
            <span className="flex items-center gap-2 text-xs text-muted">
              {formatDate(h.searchedAt)}
              <FiArrowRight className="opacity-0 group-hover:opacity-100 transition" size={12} />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
