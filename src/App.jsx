import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Toast from "./components/Toast";

// Auth pages
import Login  from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

// User pages
import UserDashboard   from "./pages/user/Dashboard";
import BrowseWorkshops from "./pages/user/BrowseWorkshops";
import MyWorkshops     from "./pages/user/MyWorkshops";
import Resources       from "./pages/user/Resources";
import WorkshopDetail  from "./pages/user/WorkshopDetail";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import Schedule       from "./pages/admin/Schedule";
import Registrations  from "./pages/admin/Registrations";
import Materials      from "./pages/admin/Materials";

// ─── Protected Route wrapper ──────────────────────────────────────────────────
function ProtectedRoute({ children }) {
  const { currentUser } = useApp();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

// ─── App shell (only rendered when logged in) ─────────────────────────────────
function AppShell() {
  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-scroll">
        <Routes>
          {/* User routes */}
          <Route path="/"               element={<UserDashboard />} />
          <Route path="/browse"         element={<BrowseWorkshops />} />
          <Route path="/my-workshops"   element={<MyWorkshops />} />
          <Route path="/resources"      element={<Resources />} />
          <Route path="/workshop/:id"   element={<WorkshopDetail />} />

          {/* Admin routes */}
          <Route path="/admin"                 element={<AdminDashboard />} />
          <Route path="/admin/schedule"        element={<Schedule />} />
          <Route path="/admin/registrations"   element={<Registrations />} />
          <Route path="/admin/materials"       element={<Materials />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

// ─── Root router ──────────────────────────────────────────────────────────────
function AppRoutes() {
  const { currentUser } = useApp();

  return (
    <>
      <Toast />
      <Routes>
        {/* Public auth routes */}
        <Route
          path="/login"
          element={currentUser ? <Navigate to="/" replace /> : <Login />}
        />
        <Route
          path="/signup"
          element={currentUser ? <Navigate to="/" replace /> : <Signup />}
        />

        {/* All other routes require login */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <AppShell />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
