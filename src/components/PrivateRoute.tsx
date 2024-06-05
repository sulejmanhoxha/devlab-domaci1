import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useGlobalContext } from "../context/GlobalContext";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useGlobalContext();

  useEffect(() => {
    if (!accessToken) {
      console.log("access 2", accessToken);

      toast.info("You need to be logged in to view this page.");
    }
  }, [accessToken]);

  return accessToken ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
