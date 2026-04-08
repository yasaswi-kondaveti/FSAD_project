import { useState, useRef } from "react";
import { getFileIcon } from "../../data/workshops";
import { useApp } from "../../context/AppContext";
import { PageHeader } from "../../components/UI";

export default function Materials() {
  const { workshops, uploadMaterial, removeMaterial } = useApp();
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [activeWorkshopId, setActiveWorkshopId] = useState(null);

  const handleAddFileClick = (id) => {
    setActiveWorkshopId(id);
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !activeWorkshopId) return;

    setUploading(true);
    await uploadMaterial(activeWorkshopId, file);
    setUploading(false);
    
    // reset input
    e.target.value = null;
    setActiveWorkshopId(null);
  };

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Training Materials"
        subtitle="Upload and manage physical files linked to specific workshops."
      />

      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: "none" }} 
        onChange={handleFileChange} 
      />

      {/* Upload Status Banner */}
      {uploading && (
        <div className="upload-zone mb-28" style={{ padding: "16px", borderColor: "var(--accent-light)", background: "rgba(99,102,241,0.05)" }}>
          <div style={{ fontSize: 34, marginBottom: 12, display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</div>
          <div style={{ color: "var(--accent-light)", fontWeight: 500 }}>Transferring secure file to backend storage…</div>
        </div>
      )}

      {/* Per-workshop materials */}
      <div className="grid-2">
        {workshops.map((w) => (
          <div key={w.id} className="card" style={{ padding: "18px 20px" }}>
            <div className="flex-center gap-10 mb-14">
              <span style={{ fontSize: 22 }}>{w.thumbnail}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#fff" }}>{w.title}</div>
                <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{w.materials.length} file{w.materials.length !== 1 ? "s" : ""}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {w.materials.length === 0 ? (
                <p style={{ fontSize: 13, color: "var(--text-subtle)" }}>No materials yet.</p>
              ) : (
                w.materials.map((m) => (
                  <div key={m} style={{
                    display: "flex", alignItems: "center", gap: 9,
                    padding: "8px 12px",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 12, color: "var(--text-muted)",
                  }}>
                    <span>{getFileIcon(m)}</span>
                    <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m}</span>
                    <button onClick={() => removeMaterial(w.id, m)} className="btn" style={{
                      background: "none", color: "var(--color-red)",
                      fontSize: 11, padding: "2px 6px",
                    }}>Remove</button>
                  </div>
                ))
              )}
            </div>

            <button onClick={() => handleAddFileClick(w.id)} disabled={uploading} className="btn" style={{
              marginTop: 12, padding: "7px 14px",
              background: "rgba(99,102,241,0.1)",
              color: "var(--accent-light)",
              borderRadius: "var(--radius-md)",
              fontSize: 12, fontWeight: 500,
              width: "100%"
            }}>
              + Drop New File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
