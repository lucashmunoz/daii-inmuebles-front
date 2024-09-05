import { ReactElement } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import Carousel from "./Carrousel";

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;

  background-image: url("src/assets/background.jpg");
  background-size: contain;
  background-repeat: repeat;
  background-blend-mode: lighten;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding-top: 20px;
  gap: 20px;
`;

const CarrouselContainer = styled.div`
  flex: 3;
  height: 500px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  gap: 20px;
`;

const PropertyMainDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TypeDepartment = styled.text`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const PropertyTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: #000;
`;

const PublicationDetails = styled.text`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const PriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Price = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #000;
`;

const Expenses = styled.text`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const PropertyMainDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PropertyMetersContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const PropertyMetersIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const PropertyMetersText = styled.text`
  font-size: 18px;
  color: #000;
`;

const PropertyBathroomsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const PropertyBathroomsIcon = styled.img`
  width: 25px;
  height: 25px;
`;

const PropertyBathroomsText = styled.text`
  font-size: 18px;
  color: #000;
`;

const AlquilarButton = styled.button`
  background-color: #8174a2;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
`;

const PropertyDetails = (): ReactElement => {
  return(
    <PageWrapper>
      <Header />
      <MainWrapper>
        <CarrouselContainer>
          <Carousel />
        </CarrouselContainer>
        <ContentContainer>
          <PropertyMainDetailsWrapper>
            <TypeDepartment>Departamento en Alquiler</TypeDepartment>
            <PropertyTitle>Departamento amoblado en Puerto Madero</PropertyTitle>
            <PublicationDetails>Publicado hace 5 dias por Lucas Muñoz</PublicationDetails>
          </PropertyMainDetailsWrapper>
          <PriceWrapper>
            <Price>$ 650.000</Price>
            <Expenses>Expensas aproximadas $ 80.000</Expenses>
          </PriceWrapper>
          <PropertyMainDetailsContainer>
            <PropertyMetersContainer>
              <PropertyMetersIcon src="src/assets/scale-up-icon.png" />
              <PropertyMetersText>100 m2 totales</PropertyMetersText>
            </PropertyMetersContainer>
            <PropertyBathroomsContainer>
              <PropertyBathroomsIcon src="src/assets/bathroom-icon.png" />
              <PropertyBathroomsText>2 Baños</PropertyBathroomsText>
            </PropertyBathroomsContainer>
          </PropertyMainDetailsContainer>
          <AlquilarButton>Alquilar</AlquilarButton>
        </ContentContainer>
      </MainWrapper>
    </PageWrapper>
  );
};

export default PropertyDetails;
