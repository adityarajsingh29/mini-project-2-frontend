import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const PALETTE = ["#4FD1C5", "#F5A623", "#8B93A7", "#F0576B", "#6366F1", "#22C55E", "#EC4899", "#EAB308"];

export default function LanguagePieChart({ data }) {
  if (!data?.length) return null;
  const top = data.slice(0, 8);

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold mb-4">Language Usage</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={top}
            dataKey="count"
            nameKey="language"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={2}
            animationDuration={700}
          >
            {top.map((entry, i) => (
              <Cell key={entry.language} fill={PALETTE[i % PALETTE.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#1B2233", border: "1px solid #262E42", borderRadius: 12, fontSize: 12 }}
            formatter={(value, name) => [`${value} repos`, name]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
