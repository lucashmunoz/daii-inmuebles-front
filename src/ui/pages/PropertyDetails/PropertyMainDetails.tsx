import { useEffect } from "react";
import styled from "styled-components";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";
import { Button } from "@mui/material";
import { PropertyType } from "../../../models/property";
import { formatNumberToCurrency, getPropertyTypeNameByType } from "../../../helpers";
import FavouriteButton from "./FavouriteButton";
import { fetchPropertyPricePrediction } from "../../../store/properties/propertyDetailsSlice";
import { createRentProcess, fetchRentals, resetRentalsState, selectRentalStatus } from "../../../store/properties/rentalsSlice";
import PricePrediction from "./PricePrediction";
import { useAppDispatch } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../navigation/paths";
import { useSelector } from "react-redux";
import { selectPropertyDetails } from "../../../store/properties/propertyDetailsSlice";
import { currentUserId } from "../../../api/api";

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
  background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#1890ff")};
  color: #fff;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: bold;
  &:hover {
    background-color: ${(props) => (props.disabled ? "#d3d3d3" : "#40a9ff")};
  }
`;

const SpinnerContainer = styled.div`
  height: 100%;
  width: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const Spinner = styled.span`
  width: 24px;
  height: 24px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;

const DisabledMessage = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 8px;
`;

const FavouriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const calculateDaysPassed = (created_at: string): string => {
  const createdDate = new Date(created_at);
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + 3);

  const adjustedDate = new Date(createdDate);
  adjustedDate.setFullYear(adjustedDate.getFullYear());

  const timeDifference = currentDate.getTime() - adjustedDate.getTime();

  const hoursPassed = Math.floor(timeDifference / (1000 * 3600));
  const daysPassed = Math.floor(timeDifference / (1000 * 3600 * 24));
  const monthsPassed = Math.floor(daysPassed / 30);
  const yearsPassed = Math.floor(daysPassed / 365);

  if (hoursPassed > 1 && hoursPassed < 24) {
    return `Publicado hace ${hoursPassed} horas.`;
  }
  if (hoursPassed < 1) {
    return "Publicado hace menos de una hora.";
  }
  if (daysPassed < 30) {
    return `Publicado hace ${daysPassed} días.`;
  }
  if (daysPassed < 365) {
    return `Publicado hace ${monthsPassed} meses.`;
  }
  return `Publicado hace ${yearsPassed} años.`;
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const propertyDetails = useSelector(selectPropertyDetails);
  const rentalStatus = useSelector(selectRentalStatus);
  const { owner_id } = propertyDetails;

  const isOwner = owner_id === parseInt(currentUserId);
  const isRentButtonDisabled = rentalStatus === "LOADING" || isOwner || !propertyDetails.active;

  useEffect(() => {
    dispatch(fetchPropertyPricePrediction(propertyId));
  }, [dispatch, propertyId]);

  const publication_details = calculateDaysPassed(created_at);
  const bathroomsText = `${bathrooms} ${bathrooms > 1 ? "baños" : "baño"}`;
  const surfaceTotalText = `${surface_total} m² totales.`;
  const propertype = getPropertyTypeNameByType(type);
  const formattedPrice = formatNumberToCurrency({
    number: price
  });

  const handleRent = async () => {
    await dispatch(createRentProcess({
      propertyId
    }));
    await dispatch(fetchRentals({
      role: "TENANT"
    }));
    dispatch(resetRentalsState());
    navigate(paths.myContracts);
  };

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

      <PricePrediction />

      {
        rentalStatus === "LOADING"
          ? <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
          : <AlquilarButton
            onClick={handleRent}
            disabled={isRentButtonDisabled}
          >
              Alquilar
          </AlquilarButton>
      }

      {isOwner && <DisabledMessage>No puedes alquilar tu propiedad.</DisabledMessage>}

    </ContentContainer>
  );
};

export default PropertyMainDetails;
