import { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import { Button } from "@mui/material";
import { PropertyType } from "../../../models/property";
import { formatNumberToCurrency, getPropertyTypeNameByType } from "../../../helpers";
import FavouriteButton from "./FavouriteButton";
import { fetchPropertyPricePrediction, selectPricePrediction, selectPricePredictionStatus } from "../../../store/properties/propertyDetailsSlice";
import type { AppDispatch } from "../../../store";

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

const FavouriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

interface PropertyMainDetailsProps {
  type: PropertyType;
  title: string;
  created_at: string;
  propertyId: number;
  price: number;
  surface_total: number;
  bathrooms: number;
  favorite: boolean;
}

const PropertyMainDetails = ({ type, title, created_at, price, surface_total, bathrooms, propertyId, favorite }: PropertyMainDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pricePrediction = useSelector(selectPricePrediction);
  const pricePredictionStatus = useSelector(selectPricePredictionStatus);

  useEffect(() => {
    if (pricePredictionStatus === "NOT_INITIALIZED") {
      dispatch(fetchPropertyPricePrediction(propertyId));
    }
  }, [dispatch, propertyId, pricePredictionStatus]);

  const publication_details = calculateDaysPassed(created_at);
  const bathroomsText = `${bathrooms} ${bathrooms > 1 ? "baños" : "baño"}`;
  const surfaceTotalText = `${surface_total} m² totales.`;
  const propertype = getPropertyTypeNameByType(type);
  const formattedPrice = formatNumberToCurrency({
    number: price
  });
  const pricePredictionText = (() => {
    switch (pricePredictionStatus) {
      case "SUCCESS":
        return `Precio vs mercado: ${pricePrediction.classification}`;
      case "ERROR":
        return "No se pudo obtener la predicción de precio.";
      default:
        return "Obteniendo predicción de precio...";
    }
  })();

  return (
    <ContentContainer>
      <FavouriteContainer>
        <TypeDepartment>{propertype} en Alquiler</TypeDepartment>
        <FavouriteButton propertyId={propertyId} favorite={favorite} />
      </FavouriteContainer>
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

      <PricePredictionContainer>
        <p>{pricePredictionText}</p>
      </PricePredictionContainer>

      <AlquilarButton>Alquilar</AlquilarButton>
    </ContentContainer>
  );
};

export default PropertyMainDetails;
