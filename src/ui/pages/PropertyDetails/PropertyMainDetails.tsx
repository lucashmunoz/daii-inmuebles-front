import styled from "styled-components";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import { Button } from "@mui/material";
import { PropertyType } from "../../../models/property";
import { formatNumberToCurrency, getPropertyTypeNameByType } from "../../../helpers";

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

interface PropertyMainDetailsProps {
  type: PropertyType;
  title: string;
  created_at: string;
  user_id: number;
  price: number;
  surface_total: number;
  bathrooms: number;
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

const PropertyMainDetails = ({ type, title, created_at, price, surface_total, bathrooms }: PropertyMainDetailsProps) => {
  const publication_details = calculateDaysPassed(created_at);
  const bathroomsText = `${bathrooms} ${bathrooms > 1 ? "baños" : "baño"}`;
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
          <BathtubOutlinedIcon />
          <span>{bathroomsText}</span>
        </PropertySpecs>

      </PropertySpecsContainer>

      <AlquilarButton>Alquilar</AlquilarButton>
    </ContentContainer>
  );
};

export default PropertyMainDetails;
