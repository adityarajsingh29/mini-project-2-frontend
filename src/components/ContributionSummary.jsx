import { FiStar, FiTrendingUp, FiAward, FiClock } from "react-icons/fi";
import { formatNumber, formatDate } from "../utils/exportUtils.js";

export default function ContributionSummary({ analytics }) {
  if (!analytics) return null;
  const { mostStarred, recentlyUpdated, averageStars, averageForks, totalRepositories } = analytics;

  return (
    <div className="card p-6">
      <h3 className="font-display font-semibold mb-5">Contribution Summary</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-4">
          <SummaryRow icon={FiTrendingUp} label="Average stars per repo" value={averageStars} />
          <SummaryRow icon={FiTrendingUp} label="Average forks per repo" value={averageForks} />
          <SummaryRow icon={FiAward} label="Total repositories analyzed" value={totalRepositories} />
        </div>
        <div className="space-y-4">
          {mostStarred && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                <FiStar size={12} /> Top repository
              </div>
              <a href={mostStarred.html_url} target="_blank" rel="noreferrer" className="font-mono text-sm text-signal hover:underline">
                {mostStarred.name}
              </a>
              <span className="text-xs text-muted ml-2">{formatNumber(mostStarred.stargazers_count)} stars</span>
            </div>
          )}
          {recentlyUpdated && (
            <div>
              <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                <FiClock size={12} /> Most recent activity
              </div>
              <a href={recentlyUpdated.html_url} target="_blank" rel="noreferrer" className="font-mono text-sm text-signal hover:underline">
                {recentlyUpdated.name}
              </a>
              <span className="text-xs text-muted ml-2">{formatDate(recentlyUpdated.updated_at)}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-sm text-muted">
        <Icon size={14} /> {label}
      </span>
      <span className="stat-value text-sm">{value}</span>
    </div>
  );
}
