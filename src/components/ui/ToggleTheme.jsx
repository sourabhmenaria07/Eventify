import { useEffect, useState } from "react";

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark((prev) => !prev)}
      className="ml-4 px-3 py-1 border rounded-full text-sm transition-colors bg-muted hover:bg-primary text-body hover:text-white"
    >
      {isDark ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
