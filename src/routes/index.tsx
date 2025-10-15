
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/auth/Login";
import NotFound from "../pages/error/NotFound";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import Dashboard from "../pages/manage/Dashboard";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFound /> },
  { 
    path: "/",
    element: <ProtectedRoute requiredRole="admin">
      <Dashboard />
    </ProtectedRoute>
  }
]);


export default function AppRouter() {
  return <RouterProvider router={router} />;
}


