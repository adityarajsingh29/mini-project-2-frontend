export function StatCardSkeleton() {
  return (
    <div className="card p-5">
      <div className="skeleton h-3 w-20 mb-4" />
      <div className="skeleton h-7 w-16" />
    </div>
  );
}

export function ProfileCardSkeleton() {
  return (
    <div className="card p-6 flex flex-col sm:flex-row gap-5">
      <div className="skeleton w-24 h-24 rounded-2xl shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="skeleton h-5 w-40" />
        <div className="skeleton h-4 w-28" />
        <div className="skeleton h-4 w-full max-w-md" />
        <div className="flex gap-4 pt-2">
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-16" />
          <div className="skeleton h-4 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="card p-5 h-80 flex items-center justify-center">
      <div className="skeleton w-40 h-40 rounded-full" />
    </div>
  );
}

export function RepoCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <div className="skeleton h-4 w-2/3" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  );
}
