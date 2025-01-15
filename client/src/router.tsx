import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/utils/ProtectedRoute";
import Company from "@/pages/Company";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/company",
    element: (
      <ProtectedRoute>
        <Company />,
      </ProtectedRoute>
    ),
  },
]);
