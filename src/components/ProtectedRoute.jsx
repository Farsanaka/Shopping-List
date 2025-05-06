import { Navigate } from "react-router-dom";
import Auth from "../services/auth"; // 🔥

function ProtectedRoute({ children }) {
  if (!Auth.isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
