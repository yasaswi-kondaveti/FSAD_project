import { useState } from "react";
import { useApp } from "../context/AppContext";

const GRADIENTS = [
  "linear-gradient(135deg, #818CF8, #06B6D4)",
  "linear-gradient(135deg, #10B981, #3B82F6)",
  "linear-gradient(135deg, #F59E0B, #EF4444)",
  "linear-gradient(135deg, #6366f1, #a855f7)",
  "linear-gradient(135deg, #ec4899, #f43f5e)",
];

const AVATARS = ["J", "A", "👤", "🚀", "💻", "🎨", "🔥", "✨", "🤖", "🎓"];

export default function SettingsModal({ onClose }) {
  const { currentUser, updateProfile, showToast } = useApp();
  
  const [form, setForm] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    password: currentUser?.password || "",
    avatar: currentUser?.avatar || "👤",
    avatarGradient: currentUser?.avatarGradient || GRADIENTS[0],
  });

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      showToast("Fields cannot be empty.", "warning");
      return;
    }
    
    // Call Context API
    const ok = await updateProfile(currentUser.id, form);
    if (ok) onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{zIndex: 9999}}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "32px",
          width: 480,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <div className="flex-between mb-24">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#fff" }}>
            Profile Settings
          </h2>
          <button className="btn btn-ghost" onClick={onClose} style={{ fontSize: 18, padding: "5px 10px" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Avatar Preview & Selectors */}
          <div style={{ display: "flex", gap: 20, alignItems: "center", padding: "16px", background: "rgba(255,255,255,0.03)", borderRadius: 16 }}>
             <div style={{
                width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                background: form.avatarGradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, fontWeight: 700, color: "#fff",
              }}>
                {form.avatar}
             </div>
             <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Select Avatar</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
                  {AVATARS.map(a => (
                    <button key={a} onClick={() => setForm(f => ({...f, avatar: a}))} className="btn" style={{ background: form.avatar === a ? "var(--bg-item-active)" : "transparent", border: "1px solid var(--border)", padding: 6, borderRadius: 8, fontSize: 16 }}>{a}</button>
                  ))}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 8, fontWeight: 500 }}>Select Color</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {GRADIENTS.map(g => (
                    <button key={g} onClick={() => setForm(f => ({...f, avatarGradient: g}))} className="btn" style={{ background: g, width: 28, height: 28, borderRadius: "50%", border: form.avatarGradient === g ? "2px solid #fff" : "2px solid transparent", padding: 0 }} />
                  ))}
                </div>
             </div>
          </div>

          <div>
            <label className="input-label">Display Name</label>
            <input className="input" value={form.name} onChange={set("name")} />
          </div>
          <div>
            <label className="input-label">Email Address</label>
            <input className="input" value={form.email} onChange={set("email")} />
          </div>
          <div>
            <label className="input-label">Password</label>
            <input className="input" type="text" value={form.password} onChange={set("password")} />
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn btn-ghost" onClick={onClose} style={{ flex: 1, padding: "12px", borderRadius: "var(--radius-md)" }}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} style={{ flex: 2, padding: "12px", borderRadius: "var(--radius-md)", fontSize: 14 }}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
