import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/pages/Home";
import PropertiesList from "./ui/pages/PropertiesList";
import PropertyDetails from "./ui/pages/PropertyDetails";
import SearchMap from "./ui/pages/SearchMap";
import { store } from "./store";
import { Provider } from "react-redux";
import ThemeCustomization from "./themes";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { paths } from "./navigation/paths";

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.properties,
    element: <PropertiesList />
  },
  {
    path: paths.propertyDetails,
    element: <PropertyDetails />
  },
  {

    path: "/search",
    element: <SearchMap />
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
