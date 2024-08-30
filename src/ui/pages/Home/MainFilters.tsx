import { useState } from "react";
import styled from "styled-components";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { Button, Grid2 } from "@mui/material";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 360px;
`;

const FiltersContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-image: url("src/assets/background-mudanza.jpg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

const Select = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

const InputText = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

const tipoInmuebles = [
  {
    value: "departamento",
    label: "Departamento"
  },
  {
    value: "casa",
    label: "Casa"
  },
  {
    value: "ph",
    label: "PH"
  }
];

const MainFilters = () => {
  const [tipoInmueble, seTtipoInmueble] = useState(tipoInmuebles[0].value);
  const [textSearch, setTextSearch] = useState("");
  
  return (
    <Wrapper>
      <FiltersContainer>
        <Grid2 
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
          gap="1em"
        >
          <Select
            id="select-tipo-inmueble"
            size="small"
            select
            value={tipoInmueble}
            onChange={(e) => seTtipoInmueble(e.target.value)}
            sx={{ "& .MuiInputBase-input": { py: 0.75, fontSize: "0.875rem" } }}
          >
            {tipoInmuebles.map((tipoInmueble) => (
              <MenuItem key={tipoInmueble.value} value={tipoInmueble.value}>
                {tipoInmueble.label}
              </MenuItem>
            ))}
          </Select>

          <InputText
            id="input-text"
            size="small"
            value={textSearch}
            placeholder="Ingresá un barrio o ubicación"
            onChange={(e) => setTextSearch(e.target.value)}
            sx={{ "& .MuiInputBase-input": { py: 0.75, fontSize: "0.875rem" } }}
          />

          <Button size="small" variant="contained" sx={{ textTransform: "capitalize" }}>
            Buscar
          </Button>
        </Grid2>
      </FiltersContainer>
    </Wrapper>
  );
};

export default MainFilters;
