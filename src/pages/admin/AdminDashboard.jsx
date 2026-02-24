import { useState } from "react";
import { workshops, ADMIN_STATS, STATUS_COLORS, STATUS_LABELS } from "../../data/workshops";
import { PageHeader, StatCard, ProgressBar, StatusBadge } from "../../components/UI";
import CreateWorkshopModal from "../../components/CreateWorkshopModal";

export default function AdminDashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Admin Overview"
        subtitle="Wednesday, February 18, 2026"
        action={
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + New Workshop
          </button>
        }
      />

      {/* Stats */}
      <div className="grid-4 mb-32">
        {ADMIN_STATS.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Workshops Table */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--border)" }}>
          <h2 className="section-title">All Workshops</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              {["Workshop", "Date", "Instructor", "Registrations", "Status", "Actions"].map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {workshops.map((w) => (
              <tr key={w.id}>
                {/* Workshop */}
                <td>
                  <div className="flex-center gap-10">
                    <div style={{
                      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
                      background: `${w.color}22`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 16,
                    }}>
                      {w.thumbnail}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text-secondary)" }}>{w.title}</div>
                      <div style={{ fontSize: 11, color: "var(--text-subtle)" }}>{w.category}</div>
                    </div>
                  </div>
                </td>
                <td style={{ color: "var(--text-muted)" }}>{w.date}</td>
                <td style={{ color: "var(--text-muted)" }}>{w.instructor}</td>
                <td>
                  <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 5 }}>
                    {w.registered}/{w.capacity}
                  </div>
                  <div style={{ width: 80 }}>
                    <ProgressBar value={w.registered} max={w.capacity} color={w.color} />
                  </div>
                </td>
                <td><StatusBadge status={w.status} /></td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-ghost">Edit</button>
                    <button className="btn" style={{
                      padding: "6px 12px", borderRadius: "var(--radius-sm)",
                      background: "rgba(239,68,68,0.08)", color: "var(--color-red)",
                      fontSize: 12,
                    }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <CreateWorkshopModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
