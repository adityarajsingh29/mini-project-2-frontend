import { NavLink } from "react-router-dom";
import { FiHome, FiUser, FiFolder, FiPieChart, FiActivity, FiHeart, FiClock, FiX } from "react-icons/fi";

const links = [
  { to: "/", label: "Dashboard", icon: FiHome, end: true },
  { to: "/profile", label: "Profile", icon: FiUser },
  { to: "/repositories", label: "Repositories", icon: FiFolder },
  { to: "/languages", label: "Languages", icon: FiPieChart },
  { to: "/contributions", label: "Contributions", icon: FiActivity },
  { to: "/favorites", label: "Favorites", icon: FiHeart },
  { to: "/history", label: "History", icon: FiClock },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 md:top-16 left-0 h-screen md:h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-paper-line dark:border-ink-line bg-paper-raised dark:bg-ink-raised z-50 md:z-0 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex md:hidden items-center justify-between p-4 border-b border-paper-line dark:border-ink-line">
          <span className="font-display font-semibold">Menu</span>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-paper-card dark:hover:bg-ink-card">
            <FiX size={18} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? "bg-signal/10 text-signal border border-signal/30"
                    : "text-muted hover:text-slate-900 dark:hover:text-slate-100 hover:bg-paper-card dark:hover:bg-ink-card border border-transparent"
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
