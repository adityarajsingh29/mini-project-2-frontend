import { useMemo, useState } from "react";
import { FiFolder, FiDownload, FiStar, FiGitBranch, FiAlertCircle, FiHardDrive } from "react-icons/fi";
import SearchBox from "../components/SearchBox.jsx";
import RepoCard from "../components/RepoCard.jsx";
import StatCard from "../components/StatCard.jsx";
import { RepoCardSkeleton } from "../components/LoadingSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useProfile } from "../context/ProfileContext.jsx";
import { exportReposToCSV } from "../utils/exportUtils.js";

const SORT_OPTIONS = [
  { value: "stars", label: "Stars" },
  { value: "forks", label: "Forks" },
  { value: "updated", label: "Updated" },
  { value: "name", label: "Name" },
];

export default function Repositories() {
  const { profile, repoData, loading, error, search } = useProfile();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("stars");

  const filteredRepos = useMemo(() => {
    if (!repoData?.repos) return [];
    let repos = repoData.repos.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase())
    );
    const sorters = {
      stars: (a, b) => b.stargazers_count - a.stargazers_count,
      forks: (a, b) => b.forks_count - a.forks_count,
      updated: (a, b) => new Date(b.updated_at) - new Date(a.updated_at),
      name: (a, b) => a.name.localeCompare(b.name),
    };
    return [...repos].sort(sorters[sortBy]);
  }, [repoData, query, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-semibold text-2xl">Repository Analytics</h1>
        <div className="w-full sm:max-w-sm">
          <SearchBox onSearch={search} loading={loading} />
        </div>
      </div>

      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <RepoCardSkeleton key={i} />)}
        </div>
      )}

      {!loading && error && <ErrorState message={error.message} />}

      {!loading && !error && repoData && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={FiFolder} label="Total Repos" value={repoData.analytics.totalRepositories} />
            <StatCard icon={FiStar} label="Total Stars" value={repoData.analytics.totalStars} accent="spark" />
            <StatCard icon={FiGitBranch} label="Total Forks" value={repoData.analytics.totalForks} />
            <StatCard icon={FiAlertCircle} label="Open Issues" value={repoData.analytics.totalOpenIssues} accent="danger" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={FiHardDrive} label="Repo Size (KB)" value={repoData.analytics.totalSizeKb} />
            <StatCard label="Avg Stars" value={repoData.analytics.averageStars} raw />
            <StatCard label="Avg Forks" value={repoData.analytics.averageForks} raw />
            <StatCard label="Watchers" value={repoData.analytics.totalWatchers} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter repositories by name…"
              className="input-base sm:max-w-xs font-mono"
            />
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-base !w-auto text-sm"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>Sort by {o.label}</option>
                ))}
              </select>
              <button
                onClick={() => exportReposToCSV(repoData.repos, profile?.login || "repos")}
                className="btn-secondary shrink-0"
              >
                <FiDownload size={14} /> Export CSV
              </button>
            </div>
          </div>

          {filteredRepos.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRepos.map((repo, i) => <RepoCard key={repo.id} repo={repo} index={i} />)}
            </div>
          ) : (
            <EmptyState title="No repositories match" description="Try a different filter term." />
          )}
        </>
      )}

      {!loading && !error && !repoData && (
        <EmptyState
          icon={FiFolder}
          title="No repository data yet"
          description="Search a GitHub username to load repository analytics."
        />
      )}
    </div>
  );
}
