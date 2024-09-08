import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { useMediaQuery } from "@mui/material";
import { isMobileMediaQuery } from "../../../../helpers";

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;

const VerMapaButton = styled(Button)`
  text-transform: capitalize;
`;

interface FilterActionsProps {
  handleFilterButtonClick: () => void
}

const FilterActions = ({ handleFilterButtonClick }: FilterActionsProps) => {
  const isMobile = useMediaQuery(isMobileMediaQuery);

  return (
    <FiltersWrapper>
      <VerMapaButton
        size="small"
        variant="text"
        startIcon={<LocationOnIcon />}
      >
        mapa
      </VerMapaButton>
      {
        isMobile && <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "capitalize"
          }}
          onClick={handleFilterButtonClick}
        >
          Filtrar
        </Button>
      }
    </ FiltersWrapper>
  );
};

export default FilterActions;
