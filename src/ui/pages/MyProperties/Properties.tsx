import { useEffect } from "react";
import { Alert, useMediaQuery } from "@mui/material";
import { isMobileMediaQuery } from "../../../helpers";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import MyPropertyCard from "./MyPropertyCard";
import { fetchMyProperties, selectMyProperties, selectMyPropertiesStatus } from "../../../store/properties/myPropertiesSlice";

const PropertiesContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  height: 300px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const PropertiesSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const MyPropertiesPageTitle = () => <h1>Mis Publicaciones</h1>;

const Contracts = () => {
  const dispatch = useAppDispatch();

  const isMobile = useMediaQuery(isMobileMediaQuery);
  const myProperties = useAppSelector(selectMyProperties);
  const myPropertiesStatus = useAppSelector(selectMyPropertiesStatus);

  useEffect(() => {
    dispatch(fetchMyProperties());
  }, [dispatch]);

  if (myPropertiesStatus === "LOADING") {
    return (
      <PropertiesContainer>
        <MyPropertiesPageTitle />
        <LoaderContainer>
          <LoadingSkeleton />
        </LoaderContainer>
      </PropertiesContainer>
    );
  }

  if (myPropertiesStatus === "ERROR") {
    return (
      <PropertiesContainer>
        <MyPropertiesPageTitle />
        <Alert severity="error">
          Ocurrió un error al mostrar sus propiedades.
        </Alert>
      </PropertiesContainer>
    );
  }

  return (
    <PropertiesContainer>
      <MyPropertiesPageTitle />
      <PropertiesSection>
        {
          myProperties.map(property => {
            return (
              <MyPropertyCard
                orientation={isMobile ? "vertical" : "horizontal"}
                key={property.id}
                property={property}
              />
            );
          })
        }
      </PropertiesSection>
    </PropertiesContainer>
  );
};

export default Contracts;
