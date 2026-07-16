import { FiCode } from "react-icons/fi";
import SearchBox from "../components/SearchBox.jsx";
import LanguagePieChart from "../components/LanguagePieChart.jsx";
import LanguageTreemap from "../components/LanguageTreemap.jsx";
import RepoBarChart from "../components/RepoBarChart.jsx";
import { ChartSkeleton } from "../components/LoadingSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useProfile } from "../context/ProfileContext.jsx";

export default function Languages() {
  const { repoData, loading, error, search } = useProfile();
  const breakdown = repoData?.analytics.languageBreakdown || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-semibold text-2xl">Language Analytics</h1>
        <div className="w-full sm:max-w-sm">
          <SearchBox onSearch={search} loading={loading} />
        </div>
      </div>

      {loading && (
        <div className="grid lg:grid-cols-2 gap-6">
          <ChartSkeleton /><ChartSkeleton />
        </div>
      )}

      {!loading && error && <ErrorState message={error.message} />}

      {!loading && !error && breakdown.length > 0 && (
        <>
          <div className="grid lg:grid-cols-2 gap-6">
            <LanguagePieChart data={breakdown} />
            <LanguageTreemap data={breakdown} />
          </div>
          <RepoBarChart repos={repoData.repos} metric="stargazers_count" label="Stars" />

          <div className="card p-5">
            <h3 className="font-display font-semibold mb-4">Top Languages</h3>
            <div className="space-y-3">
              {breakdown.slice(0, 6).map((l) => (
                <div key={l.language}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-mono">{l.language}</span>
                    <span className="text-muted">{l.count} repos &middot; {l.percentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-paper-line dark:bg-ink-line overflow-hidden">
                    <div
                      className="h-full bg-signal rounded-full transition-all duration-700"
                      style={{ width: `${l.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {!loading && !error && breakdown.length === 0 && (
        <EmptyState
          icon={FiCode}
          title="No language data yet"
          description="Search a GitHub username to analyze their language usage."
        />
      )}
    </div>
  );
}
