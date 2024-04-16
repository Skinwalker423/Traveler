import { ReactNode, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isAuthenticated) navigate("/");
  }, [state.isAuthenticated, navigate]);
  return children;
};

export default ProtectedRoute;
