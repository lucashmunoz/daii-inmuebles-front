import { ReactElement } from "react";
import styled from "styled-components";
import LocalHotelOutlinedIcon from "@mui/icons-material/LocalHotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import HouseSidingOutlinedIcon from "@mui/icons-material/HouseSidingOutlined";

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

const PropertyDescriptionContainer = styled.div`
  display: flex;
  width: 1280px;
  flex: 3;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
`;

const PropertyCharacContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  align-self: flex-start;
  border: 2px solid gray;
  border-radius: 5px;
  padding: 10px;
`;

const PropertyCharacteristics = styled.div`
  font-size: 18px;
  color: #000;
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface PropertySecondaryDetailsProps {
  description: string;
  beds: number;
  baths: number;
  rooms: number;
  surface_covered: number;
  surface_total: number;
  district: string;
}

function formatDescription(description: string): string {
  return description.replace(/<br\s*\/?>/gi, "\n");
}

const PropertySecondaryDetails = ({ description, beds, baths, rooms, surface_covered, surface_total }: PropertySecondaryDetailsProps): ReactElement => {
  const formattedDescription = formatDescription(description);
  const bathroomsText = `${baths} ${baths > 1 ? "baños." : "baño."}`;
  const roomsText = `${rooms} ${rooms > 1 ? "ambientes." : "ambiente."}`;
  const bedsText = `${beds} ${beds > 1 ? "dormitorios." : "dormitorio."}`;

  return (
    <SectionWrapper>

      <PropertyDescriptionContainer>
        <h2> Descripción</h2>
        <p> {formattedDescription} </p>
      </PropertyDescriptionContainer>

      <PropertyCharacContainer>

        <h2> Características:</h2>

        <PropertyCharacteristics>
          <LocalHotelOutlinedIcon/>
          <p>{bedsText}</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <BathtubOutlinedIcon/>
          <p>{bathroomsText}</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <OpenInNewOutlinedIcon/>
          <p>{roomsText}</p>
        </PropertyCharacteristics>

        <PropertyCharacteristics>
          <HouseSidingOutlinedIcon />
          <p> {surface_covered}m² cubiertos | {surface_total}m² totales.</p>
        </PropertyCharacteristics>

      </PropertyCharacContainer>
    </SectionWrapper>
  );
};

export default PropertySecondaryDetails;
