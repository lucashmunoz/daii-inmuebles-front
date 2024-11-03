import { FormEvent, ReactElement, useEffect, useState } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import { useAppDispatch } from "../../../store/hooks";
import { deleteProperty, fetchProperties } from "../../../store/properties/propertiesSlice";
import Properties from "./Properties";
import styled from "styled-components";
import FilterActions from "./Filters/FilterActions";
import FiltersContent from "./Filters/FiltersContent";
import { isMobileMediaQuery } from "../../../helpers";
import { Button, useMediaQuery } from "@mui/material";
import FiltersDrawer from "./Filters/FiltersDrawer";
import { useSearchParams } from "react-router-dom";
import { PropertyType, SortBy, SurfaceType } from "../../../models/property";
import { Bouds } from "../../components/PropertiesMap";
import Footer from "../../components/Footer/Footer.tsx";

const Main = styled.main`
  display: flex;
  align-self: center;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  padding: 0 16px;
  @media only screen and (min-width: 600px) {
    max-width: 1440px;
    padding: 0 20px;
  }
`;

const FiltersContentContainer = styled.form`
  width: 280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const PropertiesContainer = styled.div`
  flex: 1;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

const PropertiesList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const [filtersParams, setFiltersParams] = useSearchParams();
  const isMobile = useMediaQuery(isMobileMediaQuery);

  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

  const filters = {
    type: filtersParams.get("type") as PropertyType,
    minPrice: filtersParams.get("minPrice") || "",
    maxPrice: filtersParams.get("maxPrice") || "",
    minSurface: filtersParams.get("minSurface") || "",
    maxSurface: filtersParams.get("maxSurface") || "",
    surfaceType: filtersParams.get("surfaceType") as SurfaceType || "COVERED",
    minBeds: filtersParams.get("minBeds") || "",
    maxBeds: filtersParams.get("maxBeds") || "",
    minRooms: filtersParams.get("minRooms") || "",
    maxRooms: filtersParams.get("maxRooms") || "",
    minBathrooms: filtersParams.get("minBathrooms") || "",
    maxBathrooms: filtersParams.get("maxBathrooms") || "",
    districts: filtersParams.get("districts") || "",
    minLat: filtersParams.get("minLat") || "",
    maxLat: filtersParams.get("maxLat") || "",
    minLon: filtersParams.get("minLon") || "",
    maxLon: filtersParams.get("maxLon") || ""
  };

  const page = filtersParams.get("page") || "";

  const sortBy = filtersParams.get("sort") as SortBy || "RECENT";

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchProperties({
      sortBy,
      filters,
      page
    }));
  };

  const onMapBoundsChange = (bounds: Bouds) => {
    const {
      latNorthEast,
      lngNorthEast,
      latSouthWest,
      lngSouthWest
    } = bounds;

    const maxLat = latNorthEast.toString();
    const maxLon = lngNorthEast.toString();
    const minLat = latSouthWest.toString();
    const minLon = lngSouthWest.toString();

    if(
      filters.maxLat === maxLat &&
      filters.maxLon === maxLon &&
      filters.minLat === minLat &&
      filters.minLon === minLon
    ) {
      return;
    }

    setFiltersParams((prev) => {
      prev.set("minLat", minLat);
      prev.set("maxLat", maxLat);
      prev.set("minLon", minLon);
      prev.set("maxLon", maxLon);
      return prev;
    });

    dispatch(fetchProperties({
      filters: {
        ...filters,
        maxLat,
        maxLon,
        minLat,
        minLon
      },
      page
    }));
  };

  const handlePageChange = (page: number) => {
    const strPage = page.toString();

    setFiltersParams((prev) => {
      prev.set("page", strPage);
      return prev;
    });

    dispatch(fetchProperties({
      sortBy,
      filters,
      page: strPage
    }));
  };

  const hideMap = () => {
    setFiltersParams((prev) => {
      prev.set("page", "1");
      prev.delete("minLat");
      prev.delete("maxLat");
      prev.delete("minLon");
      prev.delete("maxLon");
      return prev;
    });

    dispatch(fetchProperties({
      sortBy,
      filters: {
        ...filters,
        maxLat: "",
        maxLon: "",
        minLat: "",
        minLon: ""
      },
      page: "1"
    }));
  };

  useEffect(() => {
    if(!filtersParams.get("surfaceType")) {
      setFiltersParams((prev) => {
        prev.set("surfaceType", "COVERED");
        return prev;
      });
    }

    dispatch(fetchProperties({
      sortBy,
      filters,
      page
    }));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, dispatch]);

  const handleDeleteProperty = async (propertyId: number) => {
    await dispatch(deleteProperty({
      propertyId
    }));

    dispatch(fetchProperties({
      sortBy,
      filters,
      page
    }));
  };

  return (
    <PageWrapper>
      <Header />
      <Main>
        {
          isMobile
            ? <FiltersDrawer
              isFiltersDrawerOpen={isFiltersDrawerOpen}
              closeCallback={() => setIsFiltersDrawerOpen(false)}
            />
            : <FiltersContentContainer onSubmit={handleSearch}>
              <FiltersContent />

              <FullWidthButton
                variant="contained"
                size="large"
                type="submit"
              >
                Aplicar Filtros
              </FullWidthButton>
            </FiltersContentContainer>
        }
        <PropertiesContainer>
          <FilterActions
            onMapBoundsChange={onMapBoundsChange}
            handleFilterButtonClick={() => setIsFiltersDrawerOpen(true)}
            hideMap={hideMap}
          />
          <Properties handlePageChange={handlePageChange} handleDeleteProperty={handleDeleteProperty}/>
        </PropertiesContainer>
      </Main>
      <Footer/>
    </PageWrapper>
  );
};

export default PropertiesList;
