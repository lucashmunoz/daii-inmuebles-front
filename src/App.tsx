
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import ThemeCustomization from "./themes";
import { paths } from "./navigation/paths";
import PropertyDetails from "./ui/pages/PropertyDetails";
import MyProperties from "./ui/pages/MyProperties";
import MyContracts from "./ui/pages/MyContracts";
import CreateProperty from "./ui/pages/CreateProperty";
import Bookmarks from "./ui/pages/Bookmarks";
import PropertiesList from "./ui/pages/PropertiesList";
import Home from "./ui/pages/Home";
import { useState } from "react";
import PropertiesFiltersContext, { initialPropertiesFiltersState } from "./context/PropertiesFiltersContext";

const PropertiesListModule = () => {
  const [filters, setFilters] = useState(initialPropertiesFiltersState.filters);

  return (
    <PropertiesFiltersContext.Provider value={{
      filters, setFilters
    }}>
      <PropertiesList />
    </PropertiesFiltersContext.Provider>
  );
};

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />
  },
  {
    path: paths.properties,
    element: <PropertiesListModule />
  },
  {
    path: paths.propertyDetails,
    element: <PropertyDetails />
  },
  {
    path: paths.myProperties,
    element: <MyProperties />
  },
  {
    path: paths.myContracts,
    element: <MyContracts />
  },
  {
    path: paths.createProperty,
    element: <CreateProperty />
  },
  {
    path: paths.bookmarks,
    element: <Bookmarks />
  }
]);

function App() {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <RouterProvider router={router} />
      </ThemeCustomization>
    </Provider>
  );
}

export default App;
