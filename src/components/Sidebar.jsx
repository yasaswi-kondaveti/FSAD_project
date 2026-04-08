import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import SettingsModal from "./SettingsModal";

const USER_NAV = [
  { path: "/",           label: "Dashboard",        icon: "🏠" },
  { path: "/browse",     label: "Browse Workshops",  icon: "🔍" },
  { path: "/my-workshops",label: "My Workshops",     icon: "📅" },
  { path: "/resources",  label: "Resources",         icon: "📁" },
];

const ADMIN_NAV = [
  { path: "/admin",              label: "Overview",      icon: "📊" },
  { path: "/admin/schedule",     label: "Schedule",      icon: "🗓" },
  { path: "/admin/registrations",label: "Registrations", icon: "📋" },
  { path: "/admin/materials",    label: "Materials",     icon: "📤" },
];

export default function Sidebar() {
  const { role, setRole, currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const navItems = role === "admin" ? ADMIN_NAV : USER_NAV;

  return (
    <aside style={{
      width: "var(--sidebar-width)",
      background: "var(--bg-surface)",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      {/* Logo */}
      <div style={{ padding: "22px 18px 18px", borderBottom: "1px solid var(--border)" }}>
        <div className="flex-center gap-10">
          <div style={{
            width: 34, height: 34,
            background: "linear-gradient(135deg, #818CF8, #4F46E5)",
            borderRadius: 9,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 17, flexShrink: 0,
          }}>⚡</div>
          <div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 15, color: "#fff" }}>
              WorkshopHub
            </div>
            <div style={{ fontSize: 10, color: "var(--text-faint)", fontWeight: 500 }}>
              Your Learning Hub
            </div>
          </div>
        </div>
      </div>



      {/* Navigation */}
      <nav style={{ padding: "8px 8px", flex: 1 }}>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/" || item.path === "/admin"}
            style={{ textDecoration: "none" }}
          >
            {({ isActive }) => (
              <div className={`nav-item ${isActive ? "active" : ""}`}>
                <span style={{ fontSize: 15 }}>{item.icon}</span>
                {item.label}
              </div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Profile + Logout */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)" }}>
        <div className="flex-center gap-10" style={{ marginBottom: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
            background: currentUser?.avatarGradient || (role === "admin"
              ? "linear-gradient(135deg, #F59E0B, #EF4444)"
              : "linear-gradient(135deg, #818CF8, #06B6D4)"),
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, fontWeight: 700, color: "#fff",
          }}>
            {currentUser?.avatar || (role === "admin" ? "A" : "J")}
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentUser?.name || (role === "admin" ? "Alex Morgan" : "Jamie Lee")}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-faint)" }}>
              {role === "admin" ? "Administrator" : "Learner"}
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="btn"
          style={{
            width: "100%", padding: "8px", marginBottom: "8px",
            background: "transparent",
            color: "var(--text-secondary)",
            borderRadius: "var(--radius-md)",
            fontSize: 12, fontWeight: 500,
            border: "1px solid var(--border)",
          }}
        >
          ⚙️ Profile Settings
        </button>
        <button
          onClick={logout}
          className="btn"
          style={{
            width: "100%", padding: "8px",
            background: "rgba(239,68,68,0.07)",
            color: "var(--text-subtle)",
            borderRadius: "var(--radius-md)",
            fontSize: 12, fontWeight: 500,
            border: "1px solid rgba(239,68,68,0.12)",
          }}
        >
          Sign Out
        </button>
      </div>
      
      {showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}
    </aside>
  );
}
