import { ReactElement, useEffect, useState } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import { useAppDispatch } from "../../../store/hooks";
import { fetchProperties } from "../../../store/properties/propertiesSlice";
import Properties from "./Properties";
import styled from "styled-components";
import FilterActions from "./Filters/FilterActions";
import FiltersContent from "./Filters/FiltersContent";
import { PropertyType } from "../../../models/property";
import { isMobileMediaQuery } from "../../../helpers";
import { Button, useMediaQuery } from "@mui/material";
import FiltersDrawer from "./Filters/FiltersDrawer";

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

const FiltersContentContainer = styled.div`
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
  const isMobile = useMediaQuery(isMobileMediaQuery);

  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType>("APARTMENT");

  useEffect(() => {
    dispatch(fetchProperties({}));
  }, [dispatch]);

  return (
    <PageWrapper>
      <Header />
      <Main>
        {
          isMobile
            ? <FiltersDrawer
              selectedPropertyType={selectedPropertyType}
              setSelectedPropertyType={setSelectedPropertyType}
              isFiltersDrawerOpen={isFiltersDrawerOpen}
              closeCallback={() => setIsFiltersDrawerOpen(false)}
            />
            : <FiltersContentContainer>
              <FiltersContent
                selectedPropertyType={selectedPropertyType}
                setSelectedPropertyType={setSelectedPropertyType}
              />

              <FullWidthButton
                variant="contained"
                size="large"
              >
                Aplicar Filtros
              </FullWidthButton>
            </FiltersContentContainer>
        }
        <PropertiesContainer>
          <FilterActions handleFilterButtonClick={() => setIsFiltersDrawerOpen(true)}/>
          <Properties />
        </PropertiesContainer>
      </Main>
    </PageWrapper>
  );
};

export default PropertiesList;
