import { useState } from "react";
import { useApp } from "../context/AppContext";
import { CATEGORIES, LEVELS } from "../data/workshops";

const DEFAULT_FORM = {
  title: "", instructor: "", date: "", time: "",
  category: "Development", level: "Beginner",
  capacity: 20, duration: "2h", description: "",
};

export default function CreateWorkshopModal({ onClose }) {
  const { showToast } = useApp();
  const [form, setForm] = useState(DEFAULT_FORM);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = () => {
    if (!form.title.trim() || !form.instructor.trim()) {
      showToast("Please fill in all required fields.", "info");
      return;
    }
    showToast("Workshop created successfully! 🚀");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "32px",
          width: 540,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        {/* Header */}
        <div className="flex-between mb-24">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#fff" }}>
            Create New Workshop
          </h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ fontSize: 18, padding: "5px 10px" }}>✕</button>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { label: "Workshop Title *", key: "title",      placeholder: "e.g. Python for Data Science" },
            { label: "Instructor Name *", key: "instructor", placeholder: "e.g. Dr. Jane Smith" },
            { label: "Date",              key: "date",       placeholder: "e.g. Mar 15, 2026" },
            { label: "Time",              key: "time",       placeholder: "e.g. 10:00 AM EST" },
            { label: "Description",       key: "description",placeholder: "Brief description of the workshop..." },
          ].map((f) => (
            <div key={f.key}>
              <label className="input-label">{f.label}</label>
              {f.key === "description" ? (
                <textarea
                  className="input"
                  placeholder={f.placeholder}
                  value={form[f.key]}
                  onChange={set(f.key)}
                  rows={3}
                  style={{ resize: "vertical" }}
                />
              ) : (
                <input className="input" placeholder={f.placeholder} value={form[f.key]} onChange={set(f.key)} />
              )}
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label className="input-label">Category</label>
              <select className="input" value={form.category} onChange={set("category")}>
                {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Level</label>
              <select className="input" value={form.level} onChange={set("level")}>
                {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="input-label">Capacity</label>
              <input className="input" type="number" value={form.capacity} onChange={set("capacity")} min={1} />
            </div>
          </div>

          <div>
            <label className="input-label">Duration</label>
            <input className="input" placeholder="e.g. 2h, 3.5h" value={form.duration} onChange={set("duration")} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-md)" }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 2, padding: "12px", borderRadius: "var(--radius-md)", fontSize: 14 }}>
            Create Workshop →
          </button>
        </div>
      </div>
    </div>
  );
}
