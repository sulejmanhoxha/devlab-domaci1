import { useTheme } from "../hooks/useTheme";

export default function ThemeButton() {
  const { toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="absolute right-4 top-4 z-20 rounded-md bg-gray-200 p-2 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
    >
      Toggle Theme
    </button>
  );
}
