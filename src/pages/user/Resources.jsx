import { useApp } from "../../context/AppContext";
import { workshops, getFileIcon } from "../../data/workshops";
import { PageHeader, StatusBadge, EmptyState } from "../../components/UI";

export default function Resources() {
  const { registrations } = useApp();
  const myWorkshops = workshops.filter((w) => registrations.includes(w.id));

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Post-Training Resources"
        subtitle="Access materials from your registered workshops."
      />

      {myWorkshops.length === 0 ? (
        <EmptyState icon="📁" title="No resources yet" subtitle="Register for workshops to access their materials here." />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {myWorkshops.map((w) => (
            <div key={w.id} className="card" style={{ padding: "20px 22px" }}>
              {/* Header */}
              <div className="flex-between mb-14">
                <div className="flex-center gap-12">
                  <div style={{ fontSize: 26 }}>{w.thumbnail}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15, color: "#fff" }}>{w.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>by {w.instructor} · {w.date}</div>
                  </div>
                </div>
                <StatusBadge status={w.status} />
              </div>

              {/* Materials */}
              {w.materials.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--text-subtle)" }}>No materials uploaded yet.</p>
              ) : (
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {w.materials.map((m) => (
                    <button
                      key={m}
                      className="btn"
                      style={{
                        display: "flex", alignItems: "center", gap: 7,
                        padding: "8px 14px",
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--text-secondary)",
                        borderRadius: "var(--radius-md)",
                        fontSize: 12, fontWeight: 500,
                        border: "1px solid var(--border)",
                      }}
                    >
                      <span>{getFileIcon(m)}</span>
                      {m}
                      <span style={{ color: "var(--accent-light)", marginLeft: 2 }}>↓</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
