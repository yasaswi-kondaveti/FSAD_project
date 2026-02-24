import { useState } from "react";
import { workshops, CATEGORIES, STATUSES } from "../../data/workshops";
import WorkshopCard from "../../components/WorkshopCard";
import { PageHeader, EmptyState } from "../../components/UI";

export default function BrowseWorkshops() {
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [status, setStatus]       = useState("All");

  const filtered = workshops.filter((w) => {
    const matchCat    = category === "All" || w.category === category;
    const matchStatus = status   === "All" || w.status   === status;
    const matchSearch = w.title.toLowerCase().includes(search.toLowerCase())
                     || w.instructor.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchStatus && matchSearch;
  });

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="Browse Workshops"
        subtitle={`${filtered.length} workshop${filtered.length !== 1 ? "s" : ""} available`}
      />

      {/* Filters */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="input"
          style={{ width: 240 }}
          placeholder="Search workshops or instructors…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c}
              className="btn"
              onClick={() => setCategory(c)}
              style={{
                padding: "8px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: 12, fontWeight: 500,
                background: category === c ? "var(--accent)" : "rgba(255,255,255,0.05)",
                color: category === c ? "#fff" : "var(--text-muted)",
                border: "1px solid",
                borderColor: category === c ? "var(--accent)" : "transparent",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        <select
          className="input"
          style={{ width: 150 }}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No workshops found"
          subtitle="Try adjusting your search or filters."
        />
      ) : (
        <div className="grid-cards">
          {filtered.map((w) => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      )}
    </div>
  );
}
