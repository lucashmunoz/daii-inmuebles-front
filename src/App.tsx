
import { Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import ThemeCustomization from "./themes";
import { paths } from "./navigation/paths";
import PropertyDetails from "./ui/pages/PropertyDetails";
import MyProperties from "./ui/pages/MyProperties";
import MyContracts from "./ui/pages/MyContracts";
import CreateProperty from "./ui/pages/CreateProperty";
import PropertiesList from "./ui/pages/PropertiesList";
import Home from "./ui/pages/Home";
import MyBookmarks from "./ui/pages/MyBookmarks";
import EditProperty from "./ui/pages/EditProperty";

function App() {
  return (
    <Provider store={store}>
      <ThemeCustomization>
        <Routes>
          <Route path={paths.home} element={<Home />} />
          <Route path={paths.properties}>
            <Route path="" element={<PropertiesList />} />
            <Route path=":id" element={<PropertyDetails />} />
          </Route>

          <Route path={paths.myProperties}>
            <Route path="" element={<MyProperties />} />
            <Route path="edit/:id" element={<EditProperty />} />
          </Route>

          <Route path={paths.myContracts} element={<MyContracts />} />
          <Route path={paths.createProperty} element={<CreateProperty />} />
          <Route path={paths.bookmarks} element={<MyBookmarks />} />
        </Routes>
      </ThemeCustomization>
    </Provider>
  );
}

export default App;
