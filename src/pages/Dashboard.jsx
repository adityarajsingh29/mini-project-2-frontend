import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiTrendingUp, FiStar, FiUsers } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox.jsx";
import RecentSearches from "../components/RecentSearches.jsx";
import StatCard from "../components/StatCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useProfile } from "../context/ProfileContext.jsx";
import { historyApi } from "../services/api.js";

const POPULAR_DEVS = [
  { username: "torvalds", note: "Creator of Linux & Git" },
  { username: "gaearon", note: "React core team, Redux" },
  { username: "sindresorhus", note: "1000+ open source packages" },
  { username: "yyx990803", note: "Creator of Vue.js" },
  { username: "addyosmani", note: "Chrome team, web performance" },
  { username: "tj", note: "Express.js, prolific OSS author" },
];

export default function Dashboard() {
  const { search, loading, profile, repoData } = useProfile();
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    historyApi.list().then(setHistory).catch(() => {});
  }, []);

  const handleSearch = async (username) => {
    await search(username);
    historyApi.list().then(setHistory).catch(() => {});
    navigate("/profile");
  };

  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-paper-line dark:border-ink-line bg-paper-raised dark:bg-ink-raised px-6 py-14 sm:py-20 text-center">
        <div
          className="absolute inset-0 commit-grid text-signal/10 pointer-events-none"
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-signal bg-signal/10 border border-signal/30 rounded-full px-3 py-1 mb-5">
            <FiGithub size={12} /> git log --author=&lt;username&gt;
          </span>
          <h1 className="font-display font-semibold text-3xl sm:text-5xl tracking-tight leading-tight">
            Analyze any GitHub profile in seconds
          </h1>
          <p className="text-muted mt-4 text-sm sm:text-base max-w-lg mx-auto">
            Search a username to explore repositories, language usage, stars, forks,
            and contribution analytics — all in one dashboard.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <SearchBox onSearch={handleSearch} loading={loading} size="lg" />
          </div>
        </motion.div>
      </section>

      {/* Quick stats from the last analyzed profile */}
      {profile && repoData && (
        <section>
          <h2 className="font-display font-semibold text-lg mb-4">Quick Stats — @{profile.login}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={FiUsers} label="Followers" value={profile.followers} />
            <StatCard icon={FiGithub} label="Repositories" value={repoData.analytics.totalRepositories} />
            <StatCard icon={FiStar} label="Total Stars" value={repoData.analytics.totalStars} accent="spark" />
            <StatCard icon={FiTrendingUp} label="Total Forks" value={repoData.analytics.totalForks} />
          </div>
        </section>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2">
          <h2 className="font-display font-semibold text-lg mb-4">Popular GitHub Developers</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_DEVS.map((dev) => (
              <button
                key={dev.username}
                onClick={() => handleSearch(dev.username)}
                className="card card-hover p-4 text-left flex items-center gap-3"
              >
                <img
                  src={`https://github.com/${dev.username}.png?size=80`}
                  alt={dev.username}
                  className="w-10 h-10 rounded-xl"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="font-mono text-sm truncate">@{dev.username}</p>
                  <p className="text-xs text-muted truncate">{dev.note}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section>
          {history.length > 0 ? (
            <RecentSearches history={history} onSelect={handleSearch} />
          ) : (
            <EmptyState
              title="No searches yet"
              description="Analyzed profiles will show up here for quick access."
            />
          )}
        </section>
      </div>
    </div>
  );
}
