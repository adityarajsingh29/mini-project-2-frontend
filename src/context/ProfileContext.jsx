import { createContext, useContext, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { githubApi, historyApi, favoritesApi } from "../services/api.js";

const ProfileContext = createContext(null);

/**
 * Holds the "currently analyzed" GitHub profile + repo analytics so every
 * page (Profile, Repositories, Languages, Contributions) can share one
 * fetch instead of each page re-querying the GitHub API independently.
 */
export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const search = useCallback(async (username) => {
    if (!username?.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes] = await Promise.all([
        githubApi.getProfile(username.trim()),
        githubApi.getRepos(username.trim()),
      ]);
      setProfile(profileRes);
      setRepoData(reposRes);
      historyApi.add(profileRes.login).catch(() => {});
    } catch (err) {
      setProfile(null);
      setRepoData(null);
      setError(err);
      toast.error(err.message || "Search failed");
    } finally {
      setLoading(false);
    }
  }, []);

  const loadFavorites = useCallback(async () => {
    try {
      const data = await favoritesApi.list();
      setFavorites(data);
    } catch (err) {
      toast.error("Couldn't load favorites");
    }
  }, []);

  const toggleFavorite = useCallback(
    async (p) => {
      const existing = favorites.find((f) => f.username === p.login.toLowerCase());
      try {
        if (existing) {
          await favoritesApi.remove(p.login);
          setFavorites((prev) => prev.filter((f) => f.username !== p.login.toLowerCase()));
          toast.success(`Removed @${p.login} from favorites`);
        } else {
          const created = await favoritesApi.add({
            username: p.login,
            avatar: p.avatar_url,
            profileUrl: p.html_url,
            name: p.name,
            bio: p.bio,
          });
          setFavorites((prev) => [created, ...prev]);
          toast.success(`Added @${p.login} to favorites`);
        }
      } catch (err) {
        toast.error(err.message || "Couldn't update favorites");
      }
    },
    [favorites]
  );

  const isFavorite = useCallback(
    (username) => favorites.some((f) => f.username === username?.toLowerCase()),
    [favorites]
  );

  return (
    <ProfileContext.Provider
      value={{
        profile, repoData, loading, error, search,
        favorites, loadFavorites, toggleFavorite, isFavorite,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
