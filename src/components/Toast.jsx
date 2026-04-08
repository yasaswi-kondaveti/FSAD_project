import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className={`toast ${isError ? "toast-error" : "toast-success"}`} style={isError ? { background: "var(--color-red)", color: "#fff" } : {}}>
      <span>{isError ? "❌" : "✅"}</span>
      <span>{toast.message}</span>
    </div>
  );
}
