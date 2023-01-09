import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { customTheme } from "./theme/theme";
import { UserContextProvider } from "./context/UserContext";
import { ThemeContextProvider } from "./context/ThemeContext";

const theme = createTheme(customTheme);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </ThemeProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
