import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";

import { getAccessToken, getUserDetails } from "../lib/api";

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
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;

  // user
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;

  // logout function
  logout: () => void;

  // theme
  theme: string;
  toggleTheme: () => void;
};

export const GlobalContext = createContext<GlobalContext | null>(null);

export default function GlobalContextProvider({
  children,
}: GlobalContextProviderProps) {
  const navigate = useNavigate();

  const [refreshToken, setRefreshToken, removeRefreshToken] = useLocalStorage(
    "refreshToken",
    "",
    { raw: true },
  );

  const [accessToken, setAccessToken] = useState("");

  // user states
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: 0,
    email: "",
    password: "",
    name: "",
    role: "",
    avatar: "",
  });

  const logout = () => {
    setUserInfo({
      id: 0,
      email: "",
      password: "",
      name: "",
      role: "",
      avatar: "",
    });
    setAccessToken("");
    setRefreshToken("");
    removeRefreshToken();
    navigate("/login");
  };

  // theme state
  // const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useLocalStorage("theme", "dark", {
    raw: true,
  });

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // use the refresh token to get an access token. wont run if
  // refresh token is empty
  useEffect(() => {
    const getAccessTokenAndSave = async () => {
      try {
        const response = await getAccessToken(refreshToken);

        const newAccessToken = response.access_token;
        setAccessToken(newAccessToken);

        const newRefreshToken = response.refresh_token;
        setRefreshToken(newRefreshToken);
      } catch (error) {
        console.error(error);
        setRefreshToken("");
      }
    };

    if (refreshToken) {
      getAccessTokenAndSave();
    }
  }, []);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await getUserDetails(accessToken);

        setUserInfo(response);
      } catch (error) {
        console.error(error);
        setUserInfo({
          id: 0,
          email: "",
          password: "",
          name: "",
          role: "",
          avatar: "",
        });
      }
    };

    if (accessToken) {
      getUserInfo();
    }
  }, [accessToken]);

  return (
    <GlobalContext.Provider
      value={{
        // tokens
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        removeRefreshToken,

        // user
        userInfo,
        setUserInfo,

        // logout function
        logout,

        // theme
        theme,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

// custom hook
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider",
    );
  }
  return context;
}
