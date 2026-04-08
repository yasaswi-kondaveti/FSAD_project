import { useApp } from "../../context/AppContext";
import WorkshopCard from "../../components/WorkshopCard";
import { PageHeader, EmptyState } from "../../components/UI";
import { useNavigate } from "react-router-dom";

export default function MyWorkshops() {
  const { workshops } = useApp();
  const { registrations } = useApp();
  const navigate = useNavigate();

  const myWorkshops = workshops.filter((w) => registrations.includes(w.id));
  const live      = myWorkshops.filter((w) => w.status === "live");
  const upcoming  = myWorkshops.filter((w) => w.status === "upcoming");
  const past      = myWorkshops.filter((w) => w.status === "completed" || w.status === "full");

  const Section = ({ title, items }) =>
    items.length === 0 ? null : (
      <div className="mb-32">
        <h2 className="section-title mb-16">{title} <span style={{ color: "var(--text-subtle)", fontSize: 13, fontWeight: 400 }}>({items.length})</span></h2>
        <div className="grid-cards">
          {items.map((w) => <WorkshopCard key={w.id} workshop={w} />)}
        </div>
      </div>
    );

  return (
    <div className="page-pad animate-fade">
      <PageHeader
        title="My Workshops"
        subtitle={`${myWorkshops.length} workshop${myWorkshops.length !== 1 ? "s" : ""} registered`}
      />

      {myWorkshops.length === 0 ? (
        <EmptyState
          icon="📅"
          title="No workshops yet"
          subtitle="Browse and register for workshops to see them here."
          action={
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/browse")}>
              Browse Workshops
            </button>
          }
        />
      ) : (
        <>
          <Section title="🔴 Live Now"  items={live} />
          <Section title="⏳ Upcoming"  items={upcoming} />
          <Section title="✅ Completed" items={past} />
        </>
      )}
    </div>
  );
}
