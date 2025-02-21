import { selectIsAuthenticating, selectCurrentUser } from "@/store/authSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(selectCurrentUser);
  const authenticating = useSelector(selectIsAuthenticating);

  const hasToken = !!localStorage.getItem("accessToken");

  const navigate = useNavigate();
  useEffect(() => {
    if (authenticating && !hasToken) navigate("/auth");

    if (!user && !hasToken) {
      navigate("/auth", { replace: true });
    }
  }, [user, authenticating, hasToken, navigate]);

  return children;
}
