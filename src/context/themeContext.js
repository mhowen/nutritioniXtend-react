import { createContext } from "react";

export const ThemeContext = createContext({
    appTheme: 'theme-light',
    setAppTheme: (theme) => {},
});
