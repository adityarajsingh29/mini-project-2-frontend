import { useState } from "react";
import { FiSearch, FiLoader } from "react-icons/fi";

export default function SearchBox({ onSearch, loading, placeholder = "Search a GitHub username…", size = "md" }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSearch(value.trim());
  };

  const sizeClasses = size === "lg" ? "py-4 text-base" : "py-2.5 text-sm";

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        size={size === "lg" ? 20 : 16}
      />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className={`input-base pl-11 pr-24 ${sizeClasses} font-mono`}
        aria-label="GitHub username"
      />
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className="absolute right-1.5 top-1/2 -translate-y-1/2 btn-primary !py-2 !px-4 text-xs"
      >
        {loading ? <FiLoader className="animate-spin" size={14} /> : "Analyze"}
      </button>
    </form>
  );
}
