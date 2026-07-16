import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export default function RepoBarChart({ repos, metric = "stargazers_count", label = "Stars", color = "#4FD1C5" }) {
  if (!repos?.length) return null;

  const top = [...repos]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, 8)
    .map((r) => ({ name: r.name.length > 14 ? r.name.slice(0, 14) + "…" : r.name, value: r[metric] }));

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold mb-4">Top Repositories by {label}</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={top} layout="vertical" margin={{ left: 10, right: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#262E42" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 11, fill: "#8B93A7" }} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: "#8B93A7" }} width={100} />
          <Tooltip
            contentStyle={{ background: "#1B2233", border: "1px solid #262E42", borderRadius: 12, fontSize: 12 }}
            cursor={{ fill: "rgba(79,209,197,0.08)" }}
          />
          <Bar dataKey="value" fill={color} radius={[0, 6, 6, 0]} animationDuration={700} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
