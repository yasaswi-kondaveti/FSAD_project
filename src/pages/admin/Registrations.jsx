import { workshops } from "../../data/workshops";
import { PageHeader, ProgressBar, StatusBadge } from "../../components/UI";

export default function Registrations() {
  const total = workshops.reduce((sum, w) => sum + w.registered, 0);

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Registrations"
        subtitle={`${total} total registrations across ${workshops.length} workshops`}
      />

      <div className="grid-cards">
        {workshops.map((w) => (
          <div key={w.id} className="card" style={{ padding: "18px 20px" }}>
            {/* Header */}
            <div className="flex-center gap-10 mb-14">
              <div style={{ fontSize: 24 }}>{w.thumbnail}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{w.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{w.date} · {w.instructor}</div>
              </div>
            </div>

            {/* Capacity */}
            <div style={{ marginBottom: 14 }}>
              <div className="flex-between mb-6" style={{ fontSize: 12, color: "var(--text-subtle)" }}>
                <span>Registered</span>
                <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
                  {w.registered} / {w.capacity}
                </span>
              </div>
              <ProgressBar value={w.registered} max={w.capacity} color={w.color} />
              <div style={{ fontSize: 11, color: "var(--text-faint)", marginTop: 5 }}>
                {w.capacity - w.registered} spots remaining
              </div>
            </div>

            <div className="flex-between">
              <StatusBadge status={w.status} />
              <button className="btn btn-ghost">View List</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
