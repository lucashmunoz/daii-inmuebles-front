import { FormEvent, ReactElement, useContext, useEffect, useState } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import { useAppDispatch } from "../../../store/hooks";
import { fetchProperties } from "../../../store/properties/propertiesSlice";
import Properties from "./Properties";
import styled from "styled-components";
import FilterActions from "./Filters/FilterActions";
import FiltersContent from "./Filters/FiltersContent";
import { isMobileMediaQuery } from "../../../helpers";
import { Button, useMediaQuery } from "@mui/material";
import FiltersDrawer from "./Filters/FiltersDrawer";
import PropertiesFiltersContext from "../../../context/PropertiesFiltersContext";

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
  const isMobile = useMediaQuery(isMobileMediaQuery);
  const { filters } = useContext(PropertiesFiltersContext);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchProperties({
      filters
    }));
  };

  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

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
          <FilterActions handleFilterButtonClick={() => setIsFiltersDrawerOpen(true)}/>
          <Properties />
        </PropertiesContainer>
      </Main>
    </PageWrapper>
  );
};

export default PropertiesList;
