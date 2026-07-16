import { useEffect, useState } from "react";
import { FiClock, FiTrash2, FiSearch as FiSearchAgain } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import EmptyState from "../components/EmptyState.jsx";
import { historyApi } from "../services/api.js";
import { useProfile } from "../context/ProfileContext.jsx";
import { formatDate } from "../utils/exportUtils.js";
import toast from "react-hot-toast";

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { search } = useProfile();
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    historyApi.list().then(setHistory).catch(() => toast.error("Couldn't load history")).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (id) => {
    try {
      await historyApi.remove(id);
      setHistory((prev) => prev.filter((h) => h._id !== id));
    } catch {
      toast.error("Couldn't delete entry");
    }
  };

  const handleSearchAgain = async (username) => {
    await search(username);
    navigate("/profile");
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display font-semibold text-2xl">Search History</h1>

      {!loading && history.length === 0 && (
        <EmptyState
          icon={FiClock}
          title="No search history"
          description="Every username you search will be logged here."
        />
      )}

      {history.length > 0 && (
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-paper-line dark:border-ink-line text-left text-xs text-muted uppercase tracking-wide">
                <th className="px-5 py-3 font-medium">Username</th>
                <th className="px-5 py-3 font-medium">Searched</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h._id} className="border-b border-paper-line dark:border-ink-line last:border-0 hover:bg-paper-card dark:hover:bg-ink-card transition">
                  <td className="px-5 py-3 font-mono">@{h.username}</td>
                  <td className="px-5 py-3 text-muted">{formatDate(h.searchedAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleSearchAgain(h.username)}
                        className="p-2 rounded-lg hover:bg-paper-line dark:hover:bg-ink-line text-muted hover:text-signal transition"
                        aria-label="Search again"
                      >
                        <FiSearchAgain size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(h._id)}
                        className="p-2 rounded-lg hover:bg-paper-line dark:hover:bg-ink-line text-muted hover:text-danger transition"
                        aria-label="Delete entry"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
