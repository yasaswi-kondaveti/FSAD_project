import { useState } from "react";
import { workshops, getFileIcon } from "../../data/workshops";
import { PageHeader } from "../../components/UI";

export default function Materials() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 2000);
  };

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Training Materials"
        subtitle="Upload and manage materials for each workshop."
      />

      {/* Upload Zone */}
      <div className="upload-zone mb-28" onClick={handleUpload}>
        {uploading ? (
          <div>
            <div style={{ fontSize: 34, marginBottom: 12, display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</div>
            <div style={{ color: "var(--accent-light)", fontWeight: 500 }}>Uploading file…</div>
          </div>
        ) : (
          <>
            <div style={{ fontSize: 42, marginBottom: 14 }}>☁️</div>
            <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: 6 }}>
              Drop files here or click to upload
            </div>
            <div style={{ fontSize: 13, color: "var(--text-faint)" }}>
              PDF, ZIP, MP4, IPYNB, FIGMA — max 500 MB
            </div>
          </>
        )}
      </div>

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
                    <span style={{ flex: 1 }}>{m}</span>
                    <button className="btn" style={{
                      background: "none", color: "var(--color-red)",
                      fontSize: 11, padding: "2px 6px",
                    }}>Remove</button>
                  </div>
                ))
              )}
            </div>

            <button className="btn" style={{
              marginTop: 12, padding: "7px 14px",
              background: "rgba(99,102,241,0.1)",
              color: "var(--accent-light)",
              borderRadius: "var(--radius-md)",
              fontSize: 12, fontWeight: 500,
            }}>
              + Add File
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
