import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SearchBox from "../components/SearchBox.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import { ProfileCardSkeleton } from "../components/LoadingSkeleton.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { FiUser } from "react-icons/fi";
import { useProfile } from "../context/ProfileContext.jsx";

export default function Profile() {
  const { profile, loading, error, search, favorites, loadFavorites, toggleFavorite, isFavorite } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-display font-semibold text-2xl">Profile</h1>
        <div className="w-full sm:max-w-sm">
          <SearchBox onSearch={search} loading={loading} />
        </div>
      </div>

      {loading && <ProfileCardSkeleton />}

      {!loading && error && (
        <ErrorState message={error.message} onRetry={() => profile && search(profile.login)} />
      )}

      {!loading && !error && profile && (
        <ProfileCard
          profile={profile}
          isFavorite={isFavorite(profile.login)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {!loading && !error && !profile && (
        <EmptyState
          icon={FiUser}
          title="No profile loaded"
          description="Search a GitHub username above to see their profile details."
          action={
            <button onClick={() => navigate("/")} className="btn-secondary mt-2">
              Go to Dashboard
            </button>
          }
        />
      )}
    </div>
  );
}
