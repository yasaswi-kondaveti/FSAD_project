import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser]     = useState(null);
  const [role, setRole]                   = useState("user");
  const [registrations, setRegistrations] = useState([]);
  const [workshops, setWorkshops]         = useState([]);
  const [toast, setToast]                 = useState(null);
  const [authError, setAuthError]         = useState(null);

  // Fetch workshops on mount
  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const res = await api.get("/workshops");
      setWorkshops(res.data);
    } catch (err) {
      console.error("Failed to load workshops", err);
    }
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  };

  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const account = res.data;
      setCurrentUser(account);
      setRole(account.role ? account.role.toLowerCase() : "user");
      setRegistrations(account.registeredWorkshops ? account.registeredWorkshops.map(w => w.id) : []);
      showToast(`Welcome back, ${account.name.split(" ")[0]}! 👋`);
      return true;
    } catch (err) {
      setAuthError("Invalid email or password.");
      return false;
    }
  };

  const signup = async (name, email, password) => {
    setAuthError(null);
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return false;
    }
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      const account = res.data;
      setCurrentUser(account);
      setRole(account.role ? account.role.toLowerCase() : "user");
      setRegistrations([]);
      showToast(`Account created! Welcome to WorkshopHub, ${name.split(" ")[0]}! 🎉`);
      return true;
    } catch (err) {
      setAuthError("An account with this email already exists.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setRole("user");
    setRegistrations([]);
    showToast("You've been signed out.", "info");
  };

  const register = async (id) => {
    if (!currentUser) return;
    try {
      const res = await api.post(`/workshops/${id}/register?userId=${currentUser.id}`);
      setRegistrations(res.data.registeredWorkshops.map(w => w.id));
      showToast("Successfully registered for workshop! 🎉");
      fetchWorkshops(); // sync counts
    } catch (err) {
      showToast("Error registering", "error");
    }
  };

  const unregister = async (id) => {
    if (!currentUser) return;
    try {
      const res = await api.delete(`/workshops/${id}/register?userId=${currentUser.id}`);
      setRegistrations(res.data.registeredWorkshops.map(w => w.id));
      showToast("Registration cancelled.", "info");
      fetchWorkshops(); // sync counts
    } catch (err) {
      showToast("Error cancelling registration", "error");
    }
  };

  const createWorkshop = async (workshopData) => {
    try {
      await api.post("/workshops", workshopData);
      showToast("Workshop created successfully! 🚀");
      fetchWorkshops();
      return true;
    } catch (err) {
      showToast("Failed to create workshop", "error");
      return false;
    }
  };

  const updateWorkshop = async (id, workshopData) => {
    try {
      await api.put(`/workshops/${id}`, workshopData);
      showToast("Workshop updated successfully! ✨");
      fetchWorkshops();
      return true;
    } catch (err) {
      showToast("Failed to update workshop", "error");
      return false;
    }
  };

  const deleteWorkshop = async (id) => {
    if(!window.confirm("Are you sure you want to delete this workshop?")) return false;
    try {
      await api.delete(`/workshops/${id}`);
      showToast("Workshop deleted.", "info");
      fetchWorkshops();
      return true;
    } catch (err) {
      showToast("Failed to delete workshop", "error");
      return false;
    }
  };

  const isRegistered = (id) => registrations.includes(id);

  return (
    <AppContext.Provider value={{
      currentUser, login, signup, logout, authError, setAuthError,
      role, setRole,
      workshops, setWorkshops,
      createWorkshop, updateWorkshop, deleteWorkshop,
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

