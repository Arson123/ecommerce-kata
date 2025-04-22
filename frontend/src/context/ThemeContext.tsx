import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
const Ctx = createContext<{ theme: Theme; toggle: () => void } | undefined>(
  undefined
);
export const useTheme = () => {
  const t = useContext(Ctx);
  if (!t) throw new Error("useTheme must be used within ThemeProvider");
  return t;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme === "light" ? "" : "dark"
    );
  }, [theme]);

  return (
    <Ctx.Provider
      value={{
        theme,
        toggle: () => setTheme((t) => (t === "light" ? "dark" : "light")),
      }}
    >
      {children}
    </Ctx.Provider>
  );
};
