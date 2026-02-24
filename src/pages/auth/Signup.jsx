import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const INTERESTS = ["Development", "Design", "Data Science", "Business", "Marketing", "Leadership"];

export default function Signup() {
  const { signup, authError, setAuthError } = useApp();
  const navigate = useNavigate();

  const [step, setStep]               = useState(1);   // 1 = account info, 2 = profile setup
  const [loading, setLoading]         = useState(false);
  const [showPass, setShowPass]       = useState(false);
  const [interests, setInterests]     = useState([]);
  const [form, setForm]               = useState({
    name: "", email: "", password: "", confirmPassword: "",
  });

  const set = (key) => (e) => {
    setAuthError(null);
    setForm((p) => ({ ...p, [key]: e.target.value }));
  };

  const toggleInterest = (i) => {
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const handleStep1 = (e) => {
    e.preventDefault();
    setAuthError(null);
    if (!form.name.trim() || !form.email.trim() || !form.password) return;
    if (form.password !== form.confirmPassword) {
      setAuthError("Passwords don't match. Please try again.");
      return;
    }
    if (form.password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    const ok = signup(form.name.trim(), form.email.trim(), form.password);
    setLoading(false);
    if (ok) navigate("/");
  };

  const strength = getPasswordStrength(form.password);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg-base)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={orb("#4F46E5", "-5%", "60%", 400)} />
        <div style={orb("#EC4899", "65%", "-5%", 340)} />
        <div style={orb("#10B981", "50%", "75%", 280)} />
      </div>

      <div style={{
        width: "100%", maxWidth: 480, position: "relative", zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32, justifyContent: "center" }}>
          <div style={{
            width: 38, height: 38,
            background: "linear-gradient(135deg, #818CF8, #4F46E5)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>⚡</div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "#fff" }}>
            WorkshopHub
          </span>
        </div>

        {/* Card */}
        <div style={{
          background: "rgba(15,18,33,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "38px 36px",
          animation: "fadeIn 0.35s ease",
        }}>
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
            {[1, 2].map((s, i) => (
              <div key={s} style={{ display: "flex", alignItems: "center", flex: i < 1 ? 1 : "none" }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: step >= s ? "linear-gradient(135deg, var(--accent), var(--accent-purple))" : "rgba(255,255,255,0.07)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  color: step >= s ? "#fff" : "var(--text-subtle)",
                  transition: "all 0.3s ease",
                  flexShrink: 0,
                }}>
                  {step > s ? "✓" : s}
                </div>
                {i < 1 && (
                  <div style={{
                    flex: 1, height: 2, margin: "0 8px",
                    background: step > 1 ? "var(--accent)" : "rgba(255,255,255,0.08)",
                    borderRadius: 1, transition: "background 0.3s ease",
                  }} />
                )}
              </div>
            ))}
            <div style={{ marginLeft: 10 }}>
              <div style={{ fontSize: 12, color: "var(--text-subtle)", fontWeight: 500 }}>
                Step {step} of 2 — {step === 1 ? "Account Info" : "Your Interests"}
              </div>
            </div>
          </div>

          {/* ── Step 1: Account Info ── */}
          {step === 1 && (
            <>
              <div style={{ marginBottom: 26 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                  Create your account
                </h2>
                <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>
                  Already have one?{" "}
                  <Link to="/login" style={{ color: "var(--accent-light)", textDecoration: "none", fontWeight: 500 }}>
                    Sign in
                  </Link>
                </p>
              </div>

              <form onSubmit={handleStep1} style={{ display: "flex", flexDirection: "column", gap: 15 }}>
                <div>
                  <label className="input-label">Full Name</label>
                  <input className="input" placeholder="Jane Smith" value={form.name} onChange={set("name")} required />
                </div>

                <div>
                  <label className="input-label">Email Address</label>
                  <input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={set("email")} autoComplete="email" required />
                </div>

                <div>
                  <label className="input-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      className="input"
                      type={showPass ? "text" : "password"}
                      placeholder="Min. 6 characters"
                      value={form.password}
                      onChange={set("password")}
                      required
                      style={{ paddingRight: 44 }}
                    />
                    <button type="button" onClick={() => setShowPass((p) => !p)} className="btn"
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", color: "var(--text-subtle)", fontSize: 16, padding: 0 }}>
                      {showPass ? "🙈" : "👁"}
                    </button>
                  </div>
                  {/* Strength meter */}
                  {form.password && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: "flex", gap: 4, marginBottom: 4 }}>
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} style={{
                            flex: 1, height: 3, borderRadius: 2,
                            background: i <= strength.score ? strength.color : "rgba(255,255,255,0.08)",
                            transition: "background 0.3s",
                          }} />
                        ))}
                      </div>
                      <div style={{ fontSize: 11, color: strength.color }}>{strength.label}</div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="input-label">Confirm Password</label>
                  <input
                    className="input"
                    type="password"
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                    required
                    style={{
                      borderColor: form.confirmPassword && form.confirmPassword !== form.password
                        ? "rgba(239,68,68,0.5)" : undefined,
                    }}
                  />
                </div>

                {authError && <ErrorBox message={authError} />}

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "13px", fontSize: 14, marginTop: 4 }}>
                  Continue →
                </button>
              </form>
            </>
          )}

          {/* ── Step 2: Interests ── */}
          {step === 2 && (
            <>
              <div style={{ marginBottom: 24 }}>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 5 }}>
                  What do you want to learn?
                </h2>
                <p style={{ color: "var(--text-subtle)", fontSize: 14 }}>
                  Pick your interests so we can recommend the right workshops. You can change this later.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {INTERESTS.map((interest) => {
                  const active = interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className="btn"
                      style={{
                        padding: "13px 14px",
                        borderRadius: "var(--radius-lg)",
                        fontSize: 13, fontWeight: 500,
                        background: active ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                        color: active ? "var(--accent-light)" : "var(--text-muted)",
                        border: "1px solid",
                        borderColor: active ? "rgba(99,102,241,0.4)" : "var(--border)",
                        textAlign: "left",
                        transition: "all 0.18s ease",
                      }}
                    >
                      <span style={{ marginRight: 6 }}>{INTEREST_ICONS[interest]}</span>
                      {interest}
                      {active && <span style={{ float: "right" }}>✓</span>}
                    </button>
                  );
                })}
              </div>

              {/* Profile preview */}
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 16px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                marginBottom: 20,
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: "50%",
                  background: "linear-gradient(135deg, #818CF8, #06B6D4)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 700, color: "#fff", flexShrink: 0,
                }}>
                  {form.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-secondary)" }}>{form.name || "Your Name"}</div>
                  <div style={{ fontSize: 12, color: "var(--text-subtle)" }}>{form.email}</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-faint)" }}>
                  Joined Feb 2026
                </div>
              </div>

              {authError && <ErrorBox message={authError} />}

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-ghost"
                  style={{ flex: 1, padding: "13px", borderRadius: "var(--radius-md)" }}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="btn btn-primary"
                  style={{
                    flex: 2, padding: "13px", fontSize: 14,
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ display: "inline-block", width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                      Creating account…
                    </span>
                  ) : "Create Account 🚀"}
                </button>
              </div>
            </>
          )}
        </div>

        <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-faint)", marginTop: 20 }}>
          Protected by industry-standard encryption.
        </p>
      </div>
    </div>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ErrorBox({ message }) {
  return (
    <div style={{
      padding: "11px 14px",
      background: "rgba(239,68,68,0.1)",
      border: "1px solid rgba(239,68,68,0.25)",
      borderRadius: "var(--radius-md)",
      color: "#FCA5A5", fontSize: 13,
      animation: "fadeIn 0.2s ease",
    }}>
      ⚠️ {message}
    </div>
  );
}

function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  const levels = [
    { score: 1, label: "Weak",   color: "#EF4444" },
    { score: 2, label: "Fair",   color: "#F59E0B" },
    { score: 3, label: "Good",   color: "#3B82F6" },
    { score: 4, label: "Strong", color: "#10B981" },
  ];
  return levels[score - 1] || { score: 0, label: "", color: "" };
}

function orb(color, top, left, size) {
  return {
    position: "absolute",
    top, left,
    width: size, height: size,
    borderRadius: "50%",
    background: color,
    opacity: 0.1,
    filter: `blur(${size * 0.35}px)`,
  };
}

const INTEREST_ICONS = {
  Development: "⚛️",
  Design:      "🎨",
  "Data Science": "🤖",
  Business:    "📊",
  Marketing:   "📣",
  Leadership:  "🌟",
};
