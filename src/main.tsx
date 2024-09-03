import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/pages/Home";
import PropertiesList from "./ui/pages/PropertiesList";
import PropertyDetails from "./ui/pages/PropertyDetails";
import { store } from "./store";
import { Provider } from "react-redux";
import ThemeCustomization from "./themes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/properties",
    element: <PropertiesList />
  },
  {
    path: "/property",
    element: <PropertyDetails />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeCustomization>
        <RouterProvider router={router} />
      </ThemeCustomization>
    </Provider>
  </StrictMode>
);
