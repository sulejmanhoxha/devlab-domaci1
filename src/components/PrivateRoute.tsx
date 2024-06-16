import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../hooks/useAuth";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { tokenQuery } = useAuth();

  const accessToken = tokenQuery.data?.access_token;

  useEffect(() => {
    if (!accessToken) {
      toast.info("You need to be logged in to view this page.");
    }
  }, [accessToken]);

  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
