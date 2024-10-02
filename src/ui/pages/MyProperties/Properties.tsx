import { useEffect, useState } from "react";
import { Alert, useMediaQuery } from "@mui/material";
import { isMobileMediaQuery } from "../../../helpers";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import MyPropertyCard from "./MyPropertyCard";
import { fetchMyProperties, selectMyProperties, selectMyPropertiesStatus, selectTogglePropertyActiveStatus, togglePropertyActiveStatus } from "../../../store/properties/myPropertiesSlice";
import { Property } from "../../../models/property";

const PropertiesContainer = styled.main`
  padding: 16px;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  min-height: 100vh;
  height: 100%;
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
  const togglePropertyActiveState = useAppSelector(selectTogglePropertyActiveStatus);

  const [propertyIdToBeToggle, setPropertyIdToBeToggle] = useState(-1);

  const handlePropertyStatusChange = async (property: Property, newStatus: boolean) => {
    const { id } = property;
    setPropertyIdToBeToggle(id);
    const updatedProperty = {
      ...property
    };
    updatedProperty.active = newStatus;
    await dispatch(togglePropertyActiveStatus({
      propertyId: id,
      updatedProperty
    }));
    setPropertyIdToBeToggle(-1);
  };

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
            const isToggleLoading = togglePropertyActiveState === "LOADING" && propertyIdToBeToggle === property.id;

            return (
              <MyPropertyCard
                orientation={isMobile ? "vertical" : "horizontal"}
                key={property.id}
                property={property}
                isToggleLoading={isToggleLoading}
                handlePropertyStatusChange={handlePropertyStatusChange}
              />
            );
          })
        }
      </PropertiesSection>
    </PropertiesContainer>
  );
};

export default Contracts;
