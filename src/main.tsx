import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Home from "./ui/pages/Home";
import PropertiesList from "./ui/pages/PropertiesList";
import PropertyDetails from "./ui/pages/PropertyDetails";
import { theme } from "./theme";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/list",
    element: <PropertiesList />
  },
  {
    path: "/property",
    element: <PropertyDetails />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
