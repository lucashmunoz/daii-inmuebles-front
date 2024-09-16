import styled from "styled-components";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import { Button } from "@mui/material";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
`;

const TypeDepartment = styled.p`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const PropertyTitle = styled.h1`
  font-size: 25px;
  font-weight: bold;
  color: #000;
  padding: 8px 0;
`;

const PublicationDetails = styled.p`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const Price = styled.h2`
  font-size: 30px;
  font-weight: bold;
  color: #000;
  padding-top: 24px;
`;

const Expenses = styled.p`
  font-size: 15px;
  font-weight: lighter;
  color: #000;
`;

const PropertySpecsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0;
`;

const PropertySpecs = styled.div`
  font-size: 18px;
  color: #000;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const AlquilarButton = styled(Button)`
  background-color: #8174a2;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
`;

const PropertyMainDetails = () => {
  return(
    <ContentContainer>

      <TypeDepartment>Departamento en Alquiler</TypeDepartment>
      <PropertyTitle>Departamento amoblado en Puerto Madero</PropertyTitle>
      <PublicationDetails>Publicado hace 5 dias por Lucas Muñoz</PublicationDetails>

      <Price>$ 650.000</Price>
      <Expenses>Expensas aproximadas $ 80.000</Expenses>

      <PropertySpecsContainer>
        <PropertySpecs>
          <HouseSidingOutlinedIcon />
          <span> 100 m² totales </span>
        </PropertySpecs>

        <PropertySpecs>
          <BathtubOutlinedIcon />
          <span>2 Baños</span>
        </PropertySpecs>

      </PropertySpecsContainer>

      <AlquilarButton>Alquilar</AlquilarButton>
    </ContentContainer>
  );
};

export default PropertyMainDetails;
