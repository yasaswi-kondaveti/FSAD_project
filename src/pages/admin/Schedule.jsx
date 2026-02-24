import { useState } from "react";
import { workshops } from "../../data/workshops";
import { PageHeader, StatusBadge } from "../../components/UI";
import CreateWorkshopModal from "../../components/CreateWorkshopModal";

export default function Schedule() {
  const [showModal, setShowModal] = useState(false);

  const sorted = [...workshops].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Workshop Schedule"
        subtitle={`${workshops.length} sessions scheduled`}
        action={
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Workshop
          </button>
        }
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {sorted.map((w) => {
          const [month, day] = w.date.split(" ");
          return (
            <div
              key={w.id}
              className="card"
              style={{
                padding: "16px 20px",
                display: "flex", alignItems: "center", gap: 18,
                borderLeft: `4px solid ${w.color}`,
              }}
            >
              {/* Date block */}
              <div style={{ width: 56, textAlign: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: "var(--text-subtle)", fontWeight: 600, letterSpacing: "0.05em" }}>
                  {month.toUpperCase()}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff" }}>
                  {day?.replace(",", "")}
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 40, background: "var(--border)" }} />

              <div style={{ fontSize: 22 }}>{w.thumbnail}</div>

              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#fff", marginBottom: 3 }}>{w.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                  {w.time} · {w.duration} · {w.instructor}
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <StatusBadge status={w.status} />
                <button className="btn btn-ghost">Edit</button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && <CreateWorkshopModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
