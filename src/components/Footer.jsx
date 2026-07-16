import { FiGithub } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-paper-line dark:border-ink-line py-6 px-6 mt-12">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <span>Built with the MERN stack &middot; data via the GitHub REST API</span>
        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 hover:text-signal transition"
        >
          <FiGithub size={13} /> github.com
        </a>
      </div>
    </footer>
  );
}
