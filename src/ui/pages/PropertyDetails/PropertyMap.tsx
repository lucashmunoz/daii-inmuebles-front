import { ReactElement } from "react";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import Divider from "@mui/material/Divider";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px; 
  gap: 12px;
  background-color: #fff;
`;

const Title = styled.h2`
    font-size: 25px;
    font-weight: normal;
    color: #000;
`;

const Direction = styled.div`
  font-size: 18px;
  color: #000;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const PropertyMap = (): ReactElement => {
  return(
    <ContentContainer>
      <Divider />
      <Title> Ubicación </Title>

      <Direction>
        <PlaceIcon />
        <span>Av. Ing. Huergo 849, Puerto Madero, CABA</span>
      </Direction>

      <MapImage src="/src/assets/property-map.jpg" />
    </ContentContainer>
  );
};

export default PropertyMap;
