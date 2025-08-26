import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/tasks" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/tasks"
        element={
          <ProtectedRoute /* roles opcionales: roles={['admin','user']} */>
            <Tasks />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
    </Routes>
  );
}
