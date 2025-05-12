import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BackgroundLayout from "./BackgroudLayout";
import Header from "./Header";
function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <BackgroundLayout bgImage="/img/homebg.jpg">
      <Header />
      {children}
    </BackgroundLayout>
  );
}

export default ProtectedRoute;
