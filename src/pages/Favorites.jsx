import { useEffect, useState } from "react";
import { FiHeart, FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import FavoritesList from "../components/FavoritesList.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useProfile } from "../context/ProfileContext.jsx";
import { favoritesApi } from "../services/api.js";
import toast from "react-hot-toast";

export default function Favorites() {
  const { favorites, loadFavorites, search } = useProfile();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const handleRemove = async (username) => {
    try {
      await favoritesApi.remove(username);
      toast.success(`Removed @${username}`);
      loadFavorites();
    } catch {
      toast.error("Couldn't remove favorite");
    }
  };

  const handleVisit = async (username) => {
    await search(username);
    navigate("/profile");
  };

  const filtered = favorites.filter((f) => f.username.includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-semibold text-2xl">Favorites</h1>
        <div className="relative w-full sm:max-w-xs">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search favorites…"
            className="input-base pl-10 font-mono"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <FavoritesList favorites={filtered} onRemove={handleRemove} onVisit={handleVisit} compact />
      ) : (
        <EmptyState
          icon={FiHeart}
          title={favorites.length ? "No matches" : "No favorites yet"}
          description={
            favorites.length
              ? "Try a different search term."
              : "Tap the heart icon on a profile to save it here."
          }
        />
      )}
    </div>
  );
}
