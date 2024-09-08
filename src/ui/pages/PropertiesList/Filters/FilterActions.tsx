import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import styled from "styled-components";
import { InputAdornment, TextField, useMediaQuery } from "@mui/material";
import { isMobileMediaQuery } from "../../../../helpers";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useState } from "react";

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;

const VerMapaButton = styled(Button)`
  text-transform: capitalize;
`;

const InputText = styled(TextField)`
  width: 100%; 
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

interface FilterActionsProps {
  handleFilterButtonClick: () => void
}

const FilterActions = ({ handleFilterButtonClick }: FilterActionsProps) => {
  const isMobile = useMediaQuery(isMobileMediaQuery);
  const [textSearch, setTextSearch] = useState("");

  return (
    <FiltersWrapper>
      <InputText
        label="Ingresá un barrio o ubicación"
        id="outlined-start-adornment"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            )
          }
        }}
      />

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
