import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../services/auth"; // 🔥

function ProtectedRoute({ children }) {
  if (!isUserLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
