import { selectIsAuthenticating, selectCurrentUser } from "@/store/authSlice";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function AuthProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useSelector(selectCurrentUser);
  const isAuthenticating = useSelector(selectIsAuthenticating);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isAuthenticating) navigate("/dashboard");
  }, [user, isAuthenticating, navigate]);

  return children;
}
