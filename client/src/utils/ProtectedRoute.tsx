import { selectCurrentUser } from "@/store/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(selectCurrentUser);

  if (!user) return <Navigate to="/auth" replace />;
  return children;
}
