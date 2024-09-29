import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import Carousel from "./Carrousel";
import PageWrapper from "../../components/PageWrapper";
import PropertyMainDetails from "./PropertyMainDetails";
import PropertyMap from "./PropertyMap";
import { Alert, Divider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchPropertyDetails, selectPropertyDetails, selectPropertyDetailsStatus } from "../../../store/properties/propertyDetailsSlice";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import PropertySecondaryDetails from "./PropertySecondaryDetails";

const SectionWrapper = styled.section`
  display: flex;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px;
  gap: 20px;
  flex-direction: column;
  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const CarrouselContainer = styled.div` 
  flex: 3;
  height: 500px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const PropertyDetails = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();

  const propertyDetails = useAppSelector(selectPropertyDetails);
  const propertyDetailsStatus = useAppSelector(selectPropertyDetailsStatus);

  const { bathrooms, beds, created_at, description, district, images, price, rooms, surface_covered, surface_total, title, type, favorite } = propertyDetails;

  useEffect(() => {
    dispatch(fetchPropertyDetails({
      propertyId: Number(id)
    }));
  }, [dispatch, id]);

  if (propertyDetailsStatus === "LOADING") {
    return (
      <PageWrapper>
        <Header />
        <LoaderContainer>
          <LoadingSkeleton />
        </LoaderContainer>
      </PageWrapper>
    );
  }

  if (propertyDetailsStatus === "ERROR") {
    return (
      <PageWrapper>
        <Header />
        <Alert severity="error">
          Ocurrió un error al mostrar la propiedad.
        </Alert>
      </PageWrapper>
    );
  }

  return(
    <PageWrapper>
      <Header />

      <main>

        <SectionWrapper>
          <CarrouselContainer>
            <Carousel
              images={images}
            />
          </CarrouselContainer>
          <PropertyMainDetails
            type={type}
            title={title}
            created_at={created_at}
            price={price}
            surface_total={surface_total}
            bathrooms={bathrooms}
            propertyId={Number(id)}
            favorite={favorite}
          />

        </SectionWrapper>
        <Divider />
        <PropertySecondaryDetails
          description={description}
          beds={beds}
          baths={bathrooms}
          rooms={rooms}
          surface_covered={surface_covered}
          surface_total={surface_total}
          district={district}
        />

        <PropertyMap/>

      </main>
    </PageWrapper>
  );
};

export default PropertyDetails;
