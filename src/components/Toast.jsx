import { useApp } from "../context/AppContext";

export default function Toast() {
  const { toast } = useApp();
  if (!toast) return null;

  const isSuccess = toast.type !== "info";

  return (
    <div className={`toast ${isSuccess ? "toast-success" : "toast-info"}`}>
      <span>{isSuccess ? "✅" : "ℹ️"}</span>
      <span>{toast.message}</span>
    </div>
  );
}
