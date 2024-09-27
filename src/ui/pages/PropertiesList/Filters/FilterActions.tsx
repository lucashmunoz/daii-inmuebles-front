import { useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import { isMobileMediaQuery } from "../../../../helpers";
import PropertiesMap, { Bouds } from "../../../components/PropertiesMap";

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;

const VerMapaButton = styled(Button)`
  text-transform: capitalize;
`;

const MapContainer = styled.div`
  padding-top: 20px;
`;

interface FilterActionsProps {
  handleFilterButtonClick: () => void;
  onMapBoundsChange: (bounds: Bouds) => void
  hideMap: () => void
}

const FilterActions = ({ handleFilterButtonClick, onMapBoundsChange, hideMap }: FilterActionsProps) => {
  const [showMap, setShowMap] = useState(false);
  const isMobile = useMediaQuery(isMobileMediaQuery);

  const handleMapButtonClick = () => {
    const newShowMapState = !showMap;

    setShowMap(newShowMapState);

    if(!newShowMapState) {
      hideMap();
    }
  };

  return (
    <>
      <FiltersWrapper>
        <VerMapaButton
          size="small"
          variant="text"
          startIcon={<LocationOnIcon />}
          onClick={handleMapButtonClick}
        >
          mapa
        </VerMapaButton>
        {isMobile && (
          <Button
            size="small"
            variant="contained"
            sx={{
              textTransform: "capitalize"
            }}
            onClick={handleFilterButtonClick}
          >
            Filtrar
          </Button>
        )}
      </FiltersWrapper>
      {showMap && <MapContainer><PropertiesMap onMapBoundsChange={onMapBoundsChange}/></MapContainer>}
    </>
  );
};

export default FilterActions;
