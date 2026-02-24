import { STATUS_COLORS, STATUS_LABELS } from "../data/workshops";

// ─── Progress Bar ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max, color }) {
  const pct = Math.min((value / max) * 100, 100);
  const barColor = value === max ? "#EF4444" : color;
  return (
    <div className="progress-track">
      <div className="progress-fill" style={{ width: `${pct}%`, background: barColor }} />
    </div>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const classMap = {
    live: "badge-live",
    upcoming: "badge-upcoming",
    full: "badge-full",
    completed: "badge-completed",
  };
  return (
    <span className={`tag ${classMap[status] || ""}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}

// ─── Level Badge ──────────────────────────────────────────────────────────────
export function LevelBadge({ level }) {
  const classMap = {
    Beginner:     "level-beginner",
    Intermediate: "level-intermediate",
    Advanced:     "level-advanced",
  };
  return <span className={`tag ${classMap[level] || ""}`}>{level}</span>;
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
export function StatCard({ icon, value, label, trend, trendColor = "#10B981", valueColor = "#fff" }) {
  return (
    <div className="card" style={{ padding: "20px 22px" }}>
      <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
      <div style={{
        fontFamily: "var(--font-display)",
        fontSize: 28, fontWeight: 700,
        color: valueColor,
        marginBottom: 2,
      }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 6 }}>{label}</div>
      {trend && <div style={{ fontSize: 11, fontWeight: 500, color: trendColor }}>{trend}</div>}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
export function SectionHeader({ title, action }) {
  return (
    <div className="flex-between mb-16">
      <h2 className="section-title">{title}</h2>
      {action}
    </div>
  );
}

// ─── Page Header ─────────────────────────────────────────────────────────────
export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="flex-between mb-28">
      <div>
        <h1 className="page-title mb-4">{title}</h1>
        {subtitle && <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// ─── Tag Row ─────────────────────────────────────────────────────────────────
export function TagRow({ tags, color }) {
  return (
    <div className="flex gap-6" style={{ flexWrap: "wrap" }}>
      {tags.map((t) => (
        <span key={t} className="tag" style={{ background: `${color}22`, color }}>{t}</span>
      ))}
    </div>
  );
}

// ─── Empty State ─────────────────────────────────────────────────────────────
export function EmptyState({ icon = "📭", title, subtitle }) {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 8 }}>{title}</div>
      {subtitle && <p style={{ fontSize: 14, color: "var(--text-subtle)" }}>{subtitle}</p>}
    </div>
  );
}
