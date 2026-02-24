import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { workshops } from "../../data/workshops";
import { StatCard, SectionHeader } from "../../components/UI";

export default function UserDashboard() {
  const { registrations, register, isRegistered } = useApp();
  const navigate = useNavigate();

  const upcoming = workshops.filter((w) => registrations.includes(w.id) && (w.status === "upcoming" || w.status === "live"));
  const recommended = workshops.filter((w) => !registrations.includes(w.id) && w.status === "upcoming").slice(0, 3);
  const completed = workshops.filter((w) => registrations.includes(w.id) && w.status === "completed");

  return (
    <div className="page-pad animate-fade">
      {/* Greeting */}
      <div className="mb-28">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
          Welcome back, Jamie 👋
        </h1>
        <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>
          {upcoming.length > 0
            ? `You have ${upcoming.length} upcoming workshop${upcoming.length > 1 ? "s" : ""} this week.`
            : "Browse workshops below and register to get started."}
        </p>
      </div>

      {/* Stats */}
      <div className="grid-3 mb-32">
        <StatCard icon="📅" value={registrations.length} label="Registered"  trendColor="var(--accent-light)" />
        <StatCard icon="✅" value={completed.length}     label="Completed"   valueColor="var(--color-green)" />
        <StatCard icon="🏆" value={completed.length}     label="Certificates" valueColor="var(--color-amber)" />
      </div>

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div className="mb-32">
          <SectionHeader
            title="Upcoming Sessions"
            action={
              <button className="btn" onClick={() => navigate("/browse")}
                style={{ fontSize: 12, color: "var(--accent-light)", background: "none", padding: "4px 0" }}>
                Browse all →
              </button>
            }
          />
          <div className="grid-2">
            {upcoming.map((w) => (
              <div
                key={w.id}
                className="card card-hover"
                onClick={() => navigate(`/workshop/${w.id}`)}
                style={{ padding: "18px 20px", position: "relative", overflow: "hidden" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: w.color }} />
                <div className="flex-between mb-12">
                  <div style={{ fontSize: 28 }}>{w.thumbnail}</div>
                  {w.status === "live" && (
                    <span className="tag badge-live">● LIVE</span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, color: "#fff", marginBottom: 4 }}>{w.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 12 }}>{w.instructor}</div>
                <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--text-muted)" }}>
                  <span>📅 {w.date}</span>
                  <span>🕐 {w.time}</span>
                </div>
                {w.status === "live" && (
                  <button
                    className="btn btn-danger"
                    style={{ marginTop: 14, width: "100%", padding: "10px", fontSize: 13 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Join Session →
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended */}
      {recommended.length > 0 && (
        <div>
          <SectionHeader title="Recommended For You" />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {recommended.map((w) => (
              <div
                key={w.id}
                className="card card-hover"
                onClick={() => navigate(`/workshop/${w.id}`)}
                style={{ padding: "16px 18px", display: "flex", alignItems: "center", gap: 14 }}
              >
                <div style={{
                  width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                  background: `${w.color}22`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22,
                }}>
                  {w.thumbnail}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 2 }}>{w.title}</div>
                  <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                    {w.date} · {w.duration} · {w.level}
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={(e) => { e.stopPropagation(); register(w.id); }}
                  style={{
                    padding: "8px 16px",
                    background: "rgba(99,102,241,0.15)",
                    color: "var(--accent-light)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 12, fontWeight: 600,
                  }}
                >
                  Register
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
