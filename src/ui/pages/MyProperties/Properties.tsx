import { useEffect } from "react";
import { Alert, useMediaQuery } from "@mui/material";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
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
          Ocurrió un error al mostrar sus favoritos.
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
            const { id, images, price, district, type } = property;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price
            });

            return (
              <MyPropertyCard
                orientation={isMobile ? "vertical" : "horizontal"}
                id={id}
                district={district}
                image={image}
                price={formattedPrice}
                type={type}
              />
            );
          })
        }
      </PropertiesSection>
    </PropertiesContainer>
  );
};

export default Contracts;
