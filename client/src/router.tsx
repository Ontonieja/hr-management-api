import { createBrowserRouter, Navigate } from "react-router-dom";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import ProtectedRoute from "@/lib/ProtectedRoute";
import Company from "@/pages/Company";
import Payroll from "./pages/Payroll";
import AuthProtectedRoute from "./lib/AuthProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: (
      <AuthProtectedRoute>
        <Auth />
      </AuthProtectedRoute>
    ),
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
    path: "/payroll",
    element: (
      <ProtectedRoute>
        <Payroll />
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
