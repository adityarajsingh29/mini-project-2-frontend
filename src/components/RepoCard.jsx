import { FiStar, FiGitBranch, FiEye, FiAlertCircle, FiExternalLink } from "react-icons/fi";
import { formatDate, formatNumber } from "../utils/exportUtils.js";

const LANGUAGE_COLORS = {
  JavaScript: "#F1E05A", TypeScript: "#3178C6", Python: "#3572A5", Java: "#B07219",
  "C++": "#F34B7D", C: "#555555", HTML: "#E34C26", CSS: "#563D7C", Go: "#00ADD8",
  Rust: "#DEA584", PHP: "#4F5D95", Ruby: "#701516", Shell: "#89E051", Swift: "#F05138",
};

export default function RepoCard({ repo, index = 0 }) {
  const color = LANGUAGE_COLORS[repo.language] || "#8B93A7";

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="card card-hover p-5 flex flex-col animate-fadeUp"
      style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-mono font-medium text-sm truncate">{repo.name}</h3>
        <FiExternalLink size={14} className="text-muted shrink-0" />
      </div>
      <p className="text-xs text-muted mt-2 line-clamp-2 min-h-[2rem]">
        {repo.description || "No description provided."}
      </p>
      <div className="flex items-center gap-4 mt-4 text-xs text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1"><FiStar size={12} /> {formatNumber(repo.stargazers_count)}</span>
        <span className="flex items-center gap-1"><FiGitBranch size={12} /> {formatNumber(repo.forks_count)}</span>
        {repo.open_issues_count > 0 && (
          <span className="flex items-center gap-1"><FiAlertCircle size={12} /> {repo.open_issues_count}</span>
        )}
      </div>
      <div className="mt-3 pt-3 border-t border-paper-line dark:border-ink-line text-[11px] text-muted flex items-center gap-1.5">
        <FiEye size={11} /> Updated {formatDate(repo.updated_at)}
      </div>
    </a>
  );
}
