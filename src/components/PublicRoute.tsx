import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../hooks/useAuth";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { tokenQuery } = useAuth();

  const accessToken = tokenQuery.data?.access_token;

  useEffect(() => {
    if (accessToken) {
      console.log("access token", accessToken);

      toast.info("Only unauthenticated users can view this page.");
    }
  }, [accessToken]);

  return accessToken ? <Navigate to="/" /> : children;
};

export default PublicRoute;
