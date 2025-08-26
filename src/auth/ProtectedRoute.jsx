import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;

  if (roles?.length && !roles.includes(role)) {
    return <div style={{ padding: 20 }}>
      <h3>Acceso denegado</h3>
      <p>Tu rol no tiene permisos para ver esta página.</p>
    </div>;
  }

  return children;
}
