import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import GlobalContextProvider, {
  useGlobalContext,
} from "./context/GlobalContext";
import ChangePasswordPage from "./pages/ChangePassword";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";

const App = () => {
  return (
    <>
      <GlobalContextProvider>
        <ThemeButton />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
        </Routes>
      </GlobalContextProvider>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;

function ThemeButton() {
  const { toggleTheme } = useGlobalContext();
  return (
    <>
      <button
        onClick={toggleTheme}
        className="absolute right-4 top-4 z-20 rounded-md bg-gray-200 p-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
      >
        Toggle Theme
      </button>
    </>
  );
}
