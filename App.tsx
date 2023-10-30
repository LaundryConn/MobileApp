import { NativeRouter, Route, Routes } from "react-router-native";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import * as React from "react";
import { ThemeProvider } from "react-native-magnus";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <ThemeProvider>
      <NativeRouter>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/dashboard" Component={HomePage} />
          <Route path="/settings" Component={SettingsPage} />
        </Routes>
      </NativeRouter>
    </ThemeProvider>
  );
}
