import { QueryClient, UseQueryResult, useQuery } from "@tanstack/react-query";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { UserTokensType, getAccessToken, getUserDetails } from "../lib/api";

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export type UserInfo = {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
};

type GlobalContext = {
  // tokens
  tokenQuery: UseQueryResult<UserTokensType, Error>;

  setRefreshToken: React.Dispatch<React.SetStateAction<string | undefined>>;

  // user info
  userQuery: UseQueryResult<UserInfo, Error>;

  // logout function
  logout: () => void;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

export default function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const queryClient = new QueryClient();

  const navigate = useNavigate();

  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    "refreshToken",
    "",
    { raw: true },
  );

  const logout = () => {
    queryClient.invalidateQueries({ queryKey: ["user"] });
    queryClient.invalidateQueries({ queryKey: ["token"] });
    removeRefreshToken();
    navigate("/login");
  };

  // use the refresh token to get an access token.
  // wont run if refresh token is empty
  const tokenQuery = useQuery({
    queryKey: ["token"],
    queryFn: () => getAccessToken(refreshToken!),
    enabled: !!refreshToken && refreshToken.length > 0,
  });

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDetails(tokenQuery.data?.access_token),
    enabled:
      !!tokenQuery.data?.access_token.length &&
      tokenQuery.data?.access_token.length > 0,
  });

  return (
    <GlobalContext.Provider
      value={{
        // tokens
        tokenQuery,

        setRefreshToken,

        // user info
        userQuery,

        // logout function
        logout,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
