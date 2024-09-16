import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import Carousel from "./Carrousel";
import PageWrapper from "../../components/PageWrapper";
import PropertyMainDetails from "./PropertyMainDetails";
import PropertyMap from "./PropertyMap";
import PropertySecondaryDetails from "./PropertySecondaryDetails";

const MainWrapper = styled.main`
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

const CarrouselContainer = styled.div` flex: 3;
  height: 500px;
`;

const PropertyDetails = (): ReactElement => {
  return(
    <PageWrapper>
      <Header />

      <MainWrapper>
        <CarrouselContainer>
          <Carousel />
        </CarrouselContainer>
        <PropertyMainDetails />
      </MainWrapper>

      <PropertySecondaryDetails/>
      <PropertyMap/>
    </PageWrapper>
  );
};

export default PropertyDetails;
