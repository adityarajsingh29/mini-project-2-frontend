import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="card p-10 flex flex-col items-center text-center gap-3 animate-fadeUp">
      <div className="w-12 h-12 rounded-xl bg-danger/10 flex items-center justify-center">
        <FiAlertTriangle className="text-danger" size={22} />
      </div>
      <h3 className="font-display font-semibold text-lg">Something didn't work</h3>
      <p className="text-sm text-muted max-w-sm">{message || "An unexpected error occurred."}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-secondary mt-2">
          <FiRefreshCw size={14} /> Try again
        </button>
      )}
    </div>
  );
}
