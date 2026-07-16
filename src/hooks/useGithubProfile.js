import { useCallback, useState } from "react";
import { githubApi } from "../services/api.js";

/**
 * Fetches a GitHub profile + repo analytics together and exposes
 * loading/error state for consuming pages.
 */
export function useGithubProfile() {
  const [profile, setProfile] = useState(null);
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (username) => {
    if (!username || !username.trim()) {
      setError({ message: "Please enter a GitHub username." });
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const [profileRes, reposRes] = await Promise.all([
        githubApi.getProfile(username.trim()),
        githubApi.getRepos(username.trim()),
      ]);
      setProfile(profileRes);
      setRepoData(reposRes);
    } catch (err) {
      setProfile(null);
      setRepoData(null);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { profile, repoData, loading, error, search };
}
