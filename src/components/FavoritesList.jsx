import { FiHeart, FiExternalLink, FiTrash2 } from "react-icons/fi";

export default function FavoritesList({ favorites, onRemove, onVisit, compact = false }) {
  if (!favorites?.length) return null;

  return (
    <div className={compact ? "" : "card p-5"}>
      {!compact && (
        <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
          <FiHeart size={16} /> Favorites
        </h3>
      )}
      <div className={compact ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-3" : "space-y-2"}>
        {favorites.map((fav) => (
          <div
            key={fav._id}
            className={compact ? "card p-4 flex items-center gap-3" : "flex items-center justify-between px-3 py-2 rounded-lg hover:bg-paper-card dark:hover:bg-ink-card"}
          >
            {fav.avatar && (
              <img src={fav.avatar} alt={fav.username} className="w-9 h-9 rounded-lg object-cover" />
            )}
            <div className="flex-1 min-w-0">
              <button onClick={() => onVisit(fav.username)} className="font-mono text-sm hover:text-signal transition truncate block">
                @{fav.username}
              </button>
              {fav.name && <p className="text-xs text-muted truncate">{fav.name}</p>}
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <a href={fav.profileUrl} target="_blank" rel="noreferrer" className="p-1.5 rounded-lg hover:bg-paper-line dark:hover:bg-ink-line text-muted hover:text-signal transition">
                <FiExternalLink size={14} />
              </a>
              <button onClick={() => onRemove(fav.username)} className="p-1.5 rounded-lg hover:bg-paper-line dark:hover:bg-ink-line text-muted hover:text-danger transition">
                <FiTrash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
