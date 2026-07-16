import { FiGithub, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Navbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-paper-line dark:border-ink-line bg-paper/80 dark:bg-ink/80 backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg hover:bg-paper-card dark:hover:bg-ink-card"
            aria-label="Open menu"
          >
            <FiMenu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-signal/10 border border-signal/30 flex items-center justify-center">
              <FiGithub className="text-signal" size={18} />
            </div>
            <span className="font-display font-semibold text-base tracking-tight hidden sm:block">
              GitHub Profile Analyzer
            </span>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl border border-paper-line dark:border-ink-line hover:border-signal/50 transition"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <FiSun size={18} className="text-spark" /> : <FiMoon size={18} />}
        </button>
      </div>
    </header>
  );
}
