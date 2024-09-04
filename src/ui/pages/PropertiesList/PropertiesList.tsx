import { ReactElement, useEffect } from "react";
import Header from "../../components/Header";
import PageWrapper from "../../components/PageWrapper";
import { useAppDispatch } from "../../../store/hooks";
import { fetchProperties } from "../../../store/properties/propertiesSlice";
import Properties from "./Properties";
import styled from "styled-components";
import Filters from "./Filters";

const Main = styled.main`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
  padding: 0 16px;
  @media only screen and (min-width: 600px) {
    max-width: 1280px;
    padding: 0 20px;
  }
`;

const PropertiesList = (): ReactElement => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProperties({}));
  }, [dispatch]);

  return (
    <PageWrapper>
      <Header />
      <Main>
        <Filters />
        <Properties />
      </Main>
    </PageWrapper>
  );
};

export default PropertiesList;
