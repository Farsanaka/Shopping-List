import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Category from "./pages/Category";
import AddList from "./pages/AddList";
import ListDetails from "./pages/ListDetails";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/list"
        element={
          <ProtectedRoute>
            <AddList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/list/:id"
        element={
          <ProtectedRoute>
            <ListDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home/category"
        element={
          <ProtectedRoute>
            <Category />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
