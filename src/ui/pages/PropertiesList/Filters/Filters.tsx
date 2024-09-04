import LocationOnIcon from "@mui/icons-material/LocationOn";
import Button from "@mui/material/Button";
import styled from "styled-components";
import FiltersDrawer from "./FiltersDrawer";
import { useState } from "react";

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding-top: 16px;
`;

const Filters = () => {
  const [isFiltersDrawerOpen, setIsFiltersDrawerOpen] = useState(false);

  const handleFilter = () => {
    setIsFiltersDrawerOpen(true);
  };

  return (
    <>
      <FiltersWrapper>
        <Button
          size="small"
          variant="text"
          startIcon={<LocationOnIcon />}
          sx={{
            textTransform: "capitalize"
          }}
        >
          Ver mapa
        </Button>
        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "capitalize"
          }}
          onClick={handleFilter}
        >
          Filtrar
        </Button>
      </ FiltersWrapper>

      <FiltersDrawer isFiltersDrawerOpen={isFiltersDrawerOpen} closeCallback={() => setIsFiltersDrawerOpen(false)}/>
    </>
  );
};

export default Filters;
