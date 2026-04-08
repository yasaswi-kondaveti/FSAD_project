import { useState } from "react";
import { useApp } from "../../context/AppContext";
import { PageHeader, ProgressBar, StatusBadge } from "../../components/UI";
import api from "../../api";

export default function Registrations() {
  const { workshops, fetchWorkshops, showToast } = useApp();
  const [expandedId, setExpandedId] = useState(null);
  const [rosters, setRosters] = useState({});
  const [loading, setLoading] = useState(false);

  const total = workshops.reduce((sum, w) => sum + w.registered, 0);

  const toggleRoster = async (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!rosters[id]) {
        setLoading(true);
        try {
          const res = await api.get(`/workshops/${id}/roster`);
          setRosters((prev) => ({ ...prev, [id]: res.data }));
        } catch (err) {
          showToast("Failed to fetch roster", "error");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleKick = async (wId, userId) => {
    if (!window.confirm("Are you sure you want to remove this user from the workshop?")) return;
    try {
      await api.delete(`/workshops/${wId}/register?userId=${userId}`);
      // Remove from local roster
      setRosters((prev) => ({
        ...prev,
        [wId]: prev[wId].filter((u) => u.id !== userId)
      }));
      // Sync global metrics
      if(fetchWorkshops) fetchWorkshops();
      showToast("User removed successfully.", "info");
    } catch(err) {
      showToast("Failed to remove user.", "error");
    }
  };

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
              <button 
                className="btn btn-ghost" 
                onClick={() => toggleRoster(w.id)}
              >
                {expandedId === w.id ? "Hide Roster ▲" : "View List ▼"}
              </button>
            </div>

            {/* Expandable Roster Table */}
            {expandedId === w.id && (
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                {loading && !rosters[w.id] ? (
                  <div style={{ color: "var(--text-muted)", fontSize: 13 }}>Loading roster...</div>
                ) : rosters[w.id] && rosters[w.id].length > 0 ? (
                  <table className="data-table" style={{ fontSize: 13, minWidth: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ padding: "8px 12px" }}>Attendee</th>
                        <th style={{ padding: "8px 12px" }}>Email</th>
                        <th style={{ padding: "8px 12px", textAlign: "right" }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rosters[w.id].map((user) => (
                        <tr key={user.id}>
                          <td style={{ padding: "8px 12px" }}>
                            <div className="flex-center gap-10">
                              <div style={{
                                width: 26, height: 26, borderRadius: "50%",
                                background: user.avatarGradient || "var(--accent)",
                                color: "#fff", display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: 12, fontWeight: 700
                              }}>
                                {user.avatar || user.name.charAt(0).toUpperCase()}
                              </div>
                              <span style={{ color: "var(--text-secondary)", fontWeight: 500 }}>
                                {user.name}
                              </span>
                            </div>
                          </td>
                          <td style={{ padding: "8px 12px", color: "var(--text-muted)" }}>{user.email}</td>
                          <td style={{ padding: "8px 12px", textAlign: "right" }}>
                            <button 
                              className="btn" 
                              onClick={() => handleKick(w.id, user.id)}
                              style={{
                                padding: "4px 8px", background: "rgba(239,68,68,0.1)",
                                color: "var(--color-red)", borderRadius: "var(--radius-sm)",
                                fontSize: 11
                              }}>
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div style={{ color: "var(--text-muted)", fontSize: 13, textAlign: "center", padding: "10px 0" }}>
                    No users registered yet.
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
