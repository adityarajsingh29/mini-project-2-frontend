import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// Buckets repo creation dates by year to approximate a growth/activity trend
// (GitHub's public API doesn't expose true commit-level contribution history
// for arbitrary users without extra auth scopes).
export default function ActivityAreaChart({ repos }) {
  if (!repos?.length) return null;

  const byYear = {};
  repos.forEach((r) => {
    const year = new Date(r.created_at).getFullYear();
    byYear[year] = (byYear[year] || 0) + 1;
  });

  const data = Object.entries(byYear)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, count]) => ({ year, count }));

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold mb-4">Repository Growth Over Time</h3>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4FD1C5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#4FD1C5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#262E42" vertical={false} />
          <XAxis dataKey="year" tick={{ fontSize: 11, fill: "#8B93A7" }} />
          <YAxis tick={{ fontSize: 11, fill: "#8B93A7" }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ background: "#1B2233", border: "1px solid #262E42", borderRadius: 12, fontSize: 12 }}
          />
          <Area type="monotone" dataKey="count" stroke="#4FD1C5" fill="url(#growthGradient)" strokeWidth={2} animationDuration={700} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
