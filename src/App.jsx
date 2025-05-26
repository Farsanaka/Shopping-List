import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Category from "./pages/Category";
import AddList from "./pages/AddList";
import ListDetails from "./pages/ListDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/list",
    element: (
      <ProtectedRoute>
        <AddList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/list/:id",
    element: (
      <ProtectedRoute>
        <ListDetails />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home/category",
    element: (
      <ProtectedRoute>
        <Category />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
