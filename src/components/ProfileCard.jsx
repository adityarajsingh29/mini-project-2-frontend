import { motion } from "framer-motion";
import {
  FiMapPin, FiLink, FiBriefcase, FiUsers, FiUserPlus, FiFolder,
  FiBook, FiCalendar, FiCheckCircle, FiExternalLink, FiCopy, FiHeart,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { formatDate, formatNumber, copyToClipboard } from "../utils/exportUtils.js";

export default function ProfileCard({ profile, isFavorite, onToggleFavorite }) {
  if (!profile) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(profile.html_url);
    toast[ok ? "success" : "error"](ok ? "Profile URL copied" : "Couldn't copy URL");
  };

  const meta = [
    profile.company && { icon: FiBriefcase, label: profile.company },
    profile.location && { icon: FiMapPin, label: profile.location },
    profile.blog && { icon: FiLink, label: profile.blog },
  ].filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="card p-6"
    >
      <div className="flex flex-col sm:flex-row gap-6">
        <img
          src={profile.avatar_url}
          alt={profile.login}
          className="w-24 h-24 rounded-2xl border border-paper-line dark:border-ink-line object-cover"
        />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-display font-semibold text-xl">{profile.name || profile.login}</h2>
              <p className="text-signal font-mono text-sm">@{profile.login}</p>
            </div>
            <div className="flex items-center gap-2">
              {profile.hireable && (
                <span className="flex items-center gap-1 text-xs font-medium text-signal bg-signal/10 border border-signal/30 rounded-full px-3 py-1">
                  <FiCheckCircle size={12} /> Hireable
                </span>
              )}
              <button onClick={() => onToggleFavorite?.(profile)} className="btn-secondary !p-2.5" aria-label="Toggle favorite">
                <FiHeart size={15} className={isFavorite ? "fill-danger text-danger" : ""} />
              </button>
              <button onClick={handleCopy} className="btn-secondary !p-2.5" aria-label="Copy profile URL">
                <FiCopy size={15} />
              </button>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn-primary !p-2.5" aria-label="Open profile on GitHub">
                <FiExternalLink size={15} />
              </a>
            </div>
          </div>

          {profile.bio && <p className="text-sm text-muted mt-3 max-w-xl">{profile.bio}</p>}

          {meta.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted">
              {meta.map(({ icon: Icon, label }, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Icon size={14} /> {label}
                </span>
              ))}
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} /> Joined {formatDate(profile.created_at)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-paper-line dark:border-ink-line">
            {[
              { icon: FiUsers, label: "Followers", value: profile.followers },
              { icon: FiUserPlus, label: "Following", value: profile.following },
              { icon: FiFolder, label: "Repositories", value: profile.public_repos },
              { icon: FiBook, label: "Gists", value: profile.public_gists },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <div className="flex items-center gap-1.5 text-xs text-muted mb-1">
                  <Icon size={12} /> {label}
                </div>
                <p className="stat-value text-lg">{formatNumber(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
