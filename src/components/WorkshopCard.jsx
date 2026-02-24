import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { ProgressBar, StatusBadge, LevelBadge } from "./UI";

export default function WorkshopCard({ workshop }) {
  const { register, unregister, isRegistered } = useApp();
  const navigate = useNavigate();
  const { id, title, instructor, category, date, duration, capacity, registered, status, level, thumbnail, color } = workshop;
  const reg = isRegistered(id);

  const handleCTA = (e) => {
    e.stopPropagation();
    if (reg) unregister(id);
    else if (status === "upcoming") register(id);
  };

  return (
    <div
      className="card card-hover"
      onClick={() => navigate(`/workshop/${id}`)}
      style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      {/* Thumbnail */}
      <div style={{
        height: 118,
        background: `linear-gradient(135deg, ${color}44, ${color}11)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 48,
        position: "relative",
      }}>
        {thumbnail}
        <div style={{ position: "absolute", top: 11, right: 11 }}>
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "16px 18px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div className="flex gap-6 mb-8" style={{ flexWrap: "wrap" }}>
          <LevelBadge level={level} />
          <span className="tag" style={{ background: "rgba(255,255,255,0.06)", color: "var(--text-muted)" }}>
            {category}
          </span>
        </div>

        <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-primary)", marginBottom: 4, lineHeight: 1.35 }}>
          {title}
        </div>
        <div style={{ fontSize: 12, color: "var(--text-subtle)", marginBottom: 12 }}>
          by {instructor}
        </div>

        {/* Capacity */}
        <div style={{ marginBottom: 12 }}>
          <div className="flex-between mb-6" style={{ fontSize: 11, color: "var(--text-subtle)" }}>
            <span>Capacity</span>
            <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>{registered}/{capacity}</span>
          </div>
          <ProgressBar value={registered} max={capacity} color={color} />
        </div>

        <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--text-muted)", marginBottom: 14 }}>
          <span>📅 {date}</span>
          <span>⏱ {duration}</span>
        </div>

        {/* CTA */}
        <div style={{ marginTop: "auto" }}>
          {status === "completed" ? (
            <button className="btn btn-success" style={{ width: "100%", padding: "9px" }}>
              View Recording
            </button>
          ) : status === "full" && !reg ? (
            <button className="btn" disabled style={{
              width: "100%", padding: "9px",
              background: "rgba(255,255,255,0.04)", color: "var(--text-faint)",
              borderRadius: "var(--radius-md)", fontSize: 13, cursor: "not-allowed",
            }}>
              Session Full
            </button>
          ) : reg ? (
            <div style={{ display: "flex", gap: 8 }}>
              {status === "live" ? (
                <button
                  className="btn btn-danger"
                  style={{ flex: 1, padding: "9px" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Join Live →
                </button>
              ) : (
                <button className="btn btn-success" style={{ flex: 1, padding: "9px" }}>
                  ✓ Registered
                </button>
              )}
              <button
                className="btn"
                onClick={handleCTA}
                style={{
                  padding: "9px 12px",
                  background: "rgba(239,68,68,0.08)",
                  color: "var(--color-red)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 12,
                }}
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              style={{ width: "100%", padding: "9px" }}
              onClick={handleCTA}
            >
              Register Now →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
