import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGlobalContext } from "../context/GlobalContext";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useGlobalContext();

  useEffect(() => {
    if (accessToken) {
      console.log("access token", accessToken);

      toast.info("Only unauthenticated users can view this page.");
    }
  }, [accessToken]);

  return accessToken ? <Navigate to="/" /> : children;
};

export default PublicRoute;
