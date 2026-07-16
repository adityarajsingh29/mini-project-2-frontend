export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="card p-10 flex flex-col items-center text-center gap-3 animate-fadeUp">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-signal/10 flex items-center justify-center">
          <Icon className="text-signal" size={22} />
        </div>
      )}
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      {description && <p className="text-sm text-muted max-w-sm">{description}</p>}
      {action}
    </div>
  );
}
