import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const INITIAL_REGISTRATIONS = [1, 3, 6];

// ─── Demo accounts (simulates a backend) ─────────────────────────────────────
const DEMO_ACCOUNTS = [
  {
    id: 1,
    name: "Jamie Lee",
    email: "user@workshophub.com",
    password: "password123",
    role: "user",
    avatar: "J",
    avatarGradient: "linear-gradient(135deg, #818CF8, #06B6D4)",
    joinedDate: "January 2026",
  },
  {
    id: 2,
    name: "Alex Morgan",
    email: "admin@workshophub.com",
    password: "admin123",
    role: "admin",
    avatar: "A",
    avatarGradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    joinedDate: "December 2025",
  },
];

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser]     = useState(null);            // logged-in user object
  const [role, setRole]                   = useState("user");
  const [registrations, setRegistrations] = useState(INITIAL_REGISTRATIONS);
  const [toast, setToast]                 = useState(null);
  const [authError, setAuthError]         = useState(null);

  // ── Toast ─────────────────────────────────────────────────────────────────
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  // ── Auth ──────────────────────────────────────────────────────────────────
  const login = (email, password) => {
    setAuthError(null);
    const account = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!account) {
      setAuthError("Invalid email or password. Try the demo credentials below.");
      return false;
    }
    setCurrentUser(account);
    setRole(account.role);
    showToast(`Welcome back, ${account.name.split(" ")[0]}! 👋`);
    return true;
  };

  const signup = (name, email, password) => {
    setAuthError(null);
    const exists = DEMO_ACCOUNTS.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setAuthError("An account with this email already exists.");
      return false;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }
    // Simulate account creation — in production this hits your API
    const newUser = {
      id: Date.now(),
      name,
      email,
      role: "user",
      avatar: name.charAt(0).toUpperCase(),
      avatarGradient: "linear-gradient(135deg, #818CF8, #06B6D4)",
      joinedDate: "February 2026",
    };
    setCurrentUser(newUser);
    setRole("user");
    showToast(`Account created! Welcome to WorkshopHub, ${name.split(" ")[0]}! 🎉`);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setRole("user");
    setRegistrations(INITIAL_REGISTRATIONS);
    showToast("You've been signed out.", "info");
  };

  // ── Workshop actions ───────────────────────────────────────────────────────
  const register = (id) => {
    setRegistrations((prev) => [...prev, id]);
    showToast("Successfully registered for workshop! 🎉");
  };

  const unregister = (id) => {
    setRegistrations((prev) => prev.filter((r) => r !== id));
    showToast("Registration cancelled.", "info");
  };

  const isRegistered = (id) => registrations.includes(id);

  return (
    <AppContext.Provider value={{
      currentUser, login, signup, logout, authError, setAuthError,
      role, setRole,
      registrations, register, unregister, isRegistered,
      toast, showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
