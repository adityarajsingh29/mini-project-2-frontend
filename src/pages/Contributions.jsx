import { FiActivity } from "react-icons/fi";
import SearchBox from "../components/SearchBox.jsx";
import ContributionSummary from "../components/ContributionSummary.jsx";
import ActivityAreaChart from "../components/ActivityAreaChart.jsx";
import { ChartSkeleton } from "../components/LoadingSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useProfile } from "../context/ProfileContext.jsx";

export default function Contributions() {
  const { repoData, loading, error, search } = useProfile();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-semibold text-2xl">Contribution Summary</h1>
        <div className="w-full sm:max-w-sm">
          <SearchBox onSearch={search} loading={loading} />
        </div>
      </div>

      {loading && <ChartSkeleton />}
      {!loading && error && <ErrorState message={error.message} />}

      {!loading && !error && repoData && (
        <>
          <ContributionSummary analytics={repoData.analytics} />
          <ActivityAreaChart repos={repoData.repos} />
        </>
      )}

      {!loading && !error && !repoData && (
        <EmptyState
          icon={FiActivity}
          title="No contribution data yet"
          description="Search a GitHub username to see their coding overview."
        />
      )}
    </div>
  );
}
