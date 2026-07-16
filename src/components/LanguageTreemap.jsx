import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const PALETTE = ["#4FD1C5", "#F5A623", "#6366F1", "#22C55E", "#EC4899", "#EAB308", "#F0576B", "#8B93A7"];

export default function LanguageTreemap({ data }) {
  if (!data?.length) return null;

  const treeData = data.map((d, i) => ({
    name: d.language,
    size: d.count,
    fill: PALETTE[i % PALETTE.length],
  }));

  return (
    <div className="card p-5">
      <h3 className="font-display font-semibold mb-4">Repositories per Language</h3>
      <ResponsiveContainer width="100%" height={280}>
        <Treemap
          data={treeData}
          dataKey="size"
          nameKey="name"
          stroke="#0B0E14"
          animationDuration={700}
          content={<TreemapCell />}
        >
          <Tooltip
            contentStyle={{ background: "#1B2233", border: "1px solid #262E42", borderRadius: 12, fontSize: 12 }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}

function TreemapCell({ x, y, width, height, name, fill, size }) {
  if (width < 2 || height < 2) return null;
  const showLabel = width > 55 && height > 30;
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={6} opacity={0.85} />
      {showLabel && (
        <text x={x + 8} y={y + 18} fontSize={11} fill="#0B0E14" fontWeight={600}>
          {name}
        </text>
      )}
      {showLabel && (
        <text x={x + 8} y={y + 32} fontSize={10} fill="#0B0E14" opacity={0.7}>
          {size} repos
        </text>
      )}
    </g>
  );
}
