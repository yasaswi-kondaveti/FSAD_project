import { useParams, useNavigate } from "react-router-dom";
import { workshops, getFileIcon } from "../../data/workshops";
import { useApp } from "../../context/AppContext";
import { ProgressBar, StatusBadge, LevelBadge, TagRow } from "../../components/UI";

export default function WorkshopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, unregister, isRegistered } = useApp();

  const w = workshops.find((x) => x.id === Number(id));
  if (!w) return (
    <div className="page-pad" style={{ textAlign: "center", paddingTop: 80 }}>
      <div style={{ fontSize: 40, marginBottom: 16 }}>🔍</div>
      <h2 style={{ color: "var(--text-primary)", marginBottom: 8 }}>Workshop not found</h2>
      <button className="btn btn-primary" onClick={() => navigate("/browse")}>Back to Browse</button>
    </div>
  );

  const reg = isRegistered(w.id);
  const spotsLeft = w.capacity - w.registered;

  const details = [
    { icon: "📅", label: "Date",       value: w.date },
    { icon: "🕐", label: "Time",       value: w.time },
    { icon: "⏱",  label: "Duration",   value: w.duration },
    { icon: "🎓", label: "Level",      value: w.level },
    { icon: "👥", label: "Spots Left", value: `${spotsLeft} of ${w.capacity}` },
  ];

  return (
    <div className="page-pad animate-fade">
      <button
        className="btn"
        onClick={() => navigate(-1)}
        style={{ background: "none", color: "var(--accent-light)", fontSize: 13, padding: 0, marginBottom: 24 }}
      >
        ← Back
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 28 }}>
        {/* ── Left Column ── */}
        <div>
          {/* Hero */}
          <div style={{
            height: 210, borderRadius: "var(--radius-xl)",
            background: `linear-gradient(135deg, ${w.color}44, ${w.color}11)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 90, marginBottom: 28,
            border: "1px solid var(--border)",
          }}>
            {w.thumbnail}
          </div>

          {/* Badges */}
          <div className="flex gap-8 mb-12">
            <LevelBadge level={w.level} />
            <span className="tag" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
              {w.category}
            </span>
            <StatusBadge status={w.status} />
          </div>

          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, color: "#fff", marginBottom: 8 }}>
            {w.title}
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-subtle)", marginBottom: 6 }}>
            Instructor: <span style={{ color: "var(--text-muted)" }}>{w.instructor}</span>
          </p>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 24 }}>
            {w.description}
          </p>
          <TagRow tags={w.tags} color={w.color} />
        </div>

        {/* ── Right Sidebar ── */}
        <div>
          <div className="card" style={{ padding: "24px" }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
              Session Details
            </h3>
            <p style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 16 }}>
              {w.date} · {w.time}
            </p>

            {details.map((d) => (
              <div key={d.label} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0",
                borderBottom: "1px solid var(--border)",
              }}>
                <span style={{ fontSize: 16 }}>{d.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", marginBottom: 1 }}>{d.label}</div>
                  <div style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500 }}>{d.value}</div>
                </div>
              </div>
            ))}

            {/* Capacity bar */}
            <div style={{ marginTop: 16, marginBottom: 4 }}>
              <div className="flex-between" style={{ fontSize: 11, color: "var(--text-subtle)", marginBottom: 6 }}>
                <span>Registrations</span>
                <span>{w.registered}/{w.capacity}</span>
              </div>
              <ProgressBar value={w.registered} max={w.capacity} color={w.color} />
            </div>

            {/* CTA */}
            <div style={{ marginTop: 20 }}>
              {reg ? (
                w.status === "live" ? (
                  <button className="btn btn-danger" style={{ width: "100%", padding: "13px", fontSize: 15 }}>
                    Join Live Session →
                  </button>
                ) : (
                  <div>
                    <div style={{
                      textAlign: "center", padding: "13px",
                      background: "rgba(16,185,129,0.1)",
                      color: "var(--color-green)",
                      borderRadius: "var(--radius-md)",
                      fontWeight: 600, marginBottom: 10,
                    }}>
                      ✓ You're registered!
                    </div>
                    <button
                      className="btn"
                      onClick={() => unregister(w.id)}
                      style={{
                        width: "100%", padding: "10px",
                        background: "rgba(239,68,68,0.08)",
                        color: "var(--color-red)",
                        borderRadius: "var(--radius-md)", fontSize: 13,
                      }}
                    >
                      Cancel Registration
                    </button>
                  </div>
                )
              ) : w.status === "full" ? (
                <button className="btn" disabled style={{
                  width: "100%", padding: "13px",
                  background: "rgba(255,255,255,0.04)",
                  color: "var(--text-faint)",
                  borderRadius: "var(--radius-md)",
                  cursor: "not-allowed",
                }}>
                  Session Full
                </button>
              ) : w.status === "completed" ? (
                <button className="btn btn-success" style={{ width: "100%", padding: "13px" }}>
                  View Recording
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={() => register(w.id)}
                  style={{ width: "100%", padding: "13px", fontSize: 15 }}
                >
                  Register Now →
                </button>
              )}
            </div>

            {/* Materials */}
            {w.materials?.length > 0 && (
              <div style={{ marginTop: 22 }}>
                <div style={{
                  fontSize: 11, color: "var(--text-subtle)",
                  fontWeight: 600, marginBottom: 10,
                  textTransform: "uppercase", letterSpacing: "0.05em",
                }}>
                  Workshop Materials
                </div>
                {w.materials.map((m) => (
                  <div key={m} style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "9px 12px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "var(--radius-md)",
                    marginBottom: 7, fontSize: 13, color: "var(--text-muted)",
                  }}>
                    <span>{getFileIcon(m)}</span>
                    <span style={{ flex: 1 }}>{m}</span>
                    <span style={{ color: "var(--accent-light)", cursor: "pointer" }}>↓</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
