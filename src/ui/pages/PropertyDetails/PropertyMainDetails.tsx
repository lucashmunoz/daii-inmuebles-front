import styled from "styled-components";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import { Button } from "@mui/material";
import { PropertyType } from "../../../models/property";
import { formatNumberToCurrency, getPropertyTypeNameByType } from "../../../helpers";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  justify-content: space-between;
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
  background-color: #1890ff;
  color: #fff;
  cursor: pointer;
  font-weight: bold;
`;

const PricePredictionContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 6px;
  font-size: 16px;
  color: #000;
  border: 1px solid gray;
  border-radius: 12px;
  margin-bottom: 15px;
`;

interface PropertyMainDetailsProps {
  type: PropertyType;
  title: string;
  created_at: string;
  user_id: number;
  price: number;
  surface_total: number;
  district: string;
}

const calculateDaysPassed = (created_at: string): string => {
  const createdDate = new Date(created_at);
  const currentDate = new Date();

  const adjustedDate = new Date(createdDate);
  adjustedDate.setFullYear(adjustedDate.getFullYear() + 3);

  const timeDifference = currentDate.getTime() - adjustedDate.getTime();

  const hoursPassed = Math.floor(timeDifference / (1000 * 3600));
  const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  const monthsPassed = Math.floor(daysPassed / 30);
  const yearsPassed = Math.floor(daysPassed / 365);

  if (hoursPassed < 24) {
    return `Publicado hace ${hoursPassed} horas.`;
  } else if (daysPassed < 30) {
    return `Publicado hace ${daysPassed} días.`;
  } else if (daysPassed < 365) {
    return `Publicado hace ${monthsPassed} meses.`;
  } else {
    return `Publicado hace ${yearsPassed} años.`;
  }
};

const PropertyMainDetails = ({ type, title, created_at, price, surface_total, district }: PropertyMainDetailsProps) => {
  const publication_details = calculateDaysPassed(created_at);
  const surfaceTotalText = `${surface_total} m² totales.`;
  const propertype = getPropertyTypeNameByType(type);
  const formattedPrice = formatNumberToCurrency({
    number: price
  });

  return(
    <ContentContainer>

      <TypeDepartment>{propertype} en Alquiler</TypeDepartment>
      <PropertyTitle>{title}</PropertyTitle>
      <PublicationDetails>{publication_details}</PublicationDetails>

      <Price>${formattedPrice}</Price>

      <PropertySpecsContainer>
        <PropertySpecs>
          <HouseSidingOutlinedIcon />
          <span> {surfaceTotalText}</span>
        </PropertySpecs>

        <PropertySpecs>
          <FmdGoodOutlinedIcon />
          <span>{district}</span>
        </PropertySpecs>

      </PropertySpecsContainer>

      <PricePredictionContainer>
        <p>Precio vs mercado: Caro</p>
      </PricePredictionContainer>

      <AlquilarButton>Alquilar</AlquilarButton>
    </ContentContainer>
  );
};

export default PropertyMainDetails;
