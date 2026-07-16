import { formatNumber } from "../utils/exportUtils.js";

// Tailwind's JIT scanner needs full, static class names — it can't resolve
// `bg-${accent}/10` at build time — so accents are mapped explicitly here.
const ACCENTS = {
  signal: { bg: "bg-signal/10", text: "text-signal" },
  spark: { bg: "bg-spark/10", text: "text-spark" },
  danger: { bg: "bg-danger/10", text: "text-danger" },
};

export default function StatCard({ icon: Icon, label, value, accent = "signal", raw = false }) {
  const colors = ACCENTS[accent] || ACCENTS.signal;
  return (
    <div className="card card-hover p-5 animate-fadeUp">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-muted uppercase tracking-wide">{label}</span>
        {Icon && (
          <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
            <Icon className={colors.text} size={15} />
          </div>
        )}
      </div>
      <p className="stat-value text-2xl">
        {raw ? value : formatNumber(value)}
      </p>
    </div>
  );
}
