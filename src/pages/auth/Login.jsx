import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Login() {
  const { login, authError, setAuthError } = useApp();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const set = (key) => (e) => {
    setAuthError(null);
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return;
    }
    setLoading(true);
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 700));
    const ok = login(form.email, form.password);
    setLoading(false);
    if (ok) navigate("/");
  };

  const fillDemo = (type) => {
    setAuthError(null);
    if (type === "user") setForm({ email: "user@workshophub.com",  password: "password123" });
    else                  setForm({ email: "admin@workshophub.com", password: "admin123" });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      display: "flex",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Animated background orbs */}
      <div style={{
        position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none",
      }}>
        <div style={orb("#4F46E5", "18%", "-8%", 420)} />
        <div style={orb("#7C3AED", "70%", "60%", 360)} />
        <div style={orb("#06B6D4", "-5%", "65%", 300)} />
      </div>

      {/* Left — Branding Panel */}
      <div style={{
        width: "45%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "60px 64px",
        position: "relative",
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 56 }}>
          <div style={{
            width: 42, height: 42,
            background: "linear-gradient(135deg, #818CF8, #4F46E5)",
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>⚡</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700, color: "#fff" }}>
            WorkshopHub
          </span>
        </div>

        <div style={{ marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: 42, fontWeight: 700,
            color: "#fff", lineHeight: 1.15,
            marginBottom: 18,
          }}>
            Learn. Grow.<br />
            <span style={{ background: "linear-gradient(90deg, #818CF8, #06B6D4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Upskill.
            </span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.7, maxWidth: 380 }}>
            Join thousands of learners attending live workshops, accessing expert-led training, and building real skills.
          </p>
        </div>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            { icon: "🎯", text: "Register for live & upcoming workshops" },
            { icon: "📁", text: "Access post-training materials anytime" },
            { icon: "🏆", text: "Earn certificates upon completion" },
          ].map((f) => (
            <div key={f.text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "rgba(99,102,241,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 17,
              }}>{f.icon}</div>
              <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{
          marginTop: 52,
          padding: "20px 22px",
          background: "rgba(255,255,255,0.04)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-lg)",
        }}>
          <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.65, marginBottom: 12, fontStyle: "italic" }}>
            "WorkshopHub completely changed how our team approaches learning. The live sessions are engaging and the materials are always available after."
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "linear-gradient(135deg, #10B981, #3B82F6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "#fff",
            }}>S</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-secondary)" }}>Sofia Ramirez</div>
              <div style={{ fontSize: 11, color: "var(--text-subtle)" }}>Engineering Lead, Veritas</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Login Form */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 48px",
        position: "relative",
        zIndex: 1,
      }}>
        <div style={{
          width: "100%", maxWidth: 420,
          background: "rgba(15,18,33,0.8)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "40px 38px",
          animation: "fadeIn 0.4s ease",
        }}>
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>
              Sign in to your account
            </h2>
            <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "var(--accent-light)", textDecoration: "none", fontWeight: 500 }}>
                Create one free
              </Link>
            </p>
          </div>

          {/* Demo credential pills */}
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
              Try a demo account
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[
                { label: "👤 User Demo",  type: "user",  color: "var(--accent)" },
                { label: "⚙ Admin Demo", type: "admin", color: "#F59E0B" },
              ].map((d) => (
                <button
                  key={d.type}
                  onClick={() => fillDemo(d.type)}
                  className="btn"
                  style={{
                    flex: 1, padding: "9px 12px",
                    background: `${d.color}15`,
                    color: d.color,
                    borderRadius: "var(--radius-md)",
                    fontSize: 12, fontWeight: 600,
                    border: `1px solid ${d.color}30`,
                  }}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
            <span style={{ fontSize: 12, color: "var(--text-faint)" }}>or enter manually</span>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label className="input-label">Email address</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={set("email")}
                autoComplete="email"
                required
              />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <label className="input-label" style={{ margin: 0 }}>Password</label>
                <button type="button" className="btn" style={{ background: "none", color: "var(--accent-light)", fontSize: 12, padding: 0 }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: "relative" }}>
                <input
                  className="input"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={set("password")}
                  autoComplete="current-password"
                  required
                  style={{ paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((p) => !p)}
                  className="btn"
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", color: "var(--text-subtle)", fontSize: 16, padding: 0,
                  }}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Error */}
            {authError && (
              <div style={{
                padding: "11px 14px",
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.25)",
                borderRadius: "var(--radius-md)",
                color: "#FCA5A5",
                fontSize: 13,
                animation: "fadeIn 0.2s ease",
              }}>
                ⚠️ {authError}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: "100%", padding: "13px",
                fontSize: 15, marginTop: 4,
                opacity: loading ? 0.7 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Signing in…
                </span>
              ) : "Sign In →"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 22, lineHeight: 1.6 }}>
            By signing in, you agree to our{" "}
            <span style={{ color: "var(--accent-light)", cursor: "pointer" }}>Terms of Service</span>
            {" "}and{" "}
            <span style={{ color: "var(--accent-light)", cursor: "pointer" }}>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}

// Helper
function orb(color, top, left, size) {
  return {
    position: "absolute",
    top, left,
    width: size, height: size,
    borderRadius: "50%",
    background: color,
    opacity: 0.12,
    filter: `blur(${size * 0.35}px)`,
    animation: "pulse 8s ease-in-out infinite",
  };
}
