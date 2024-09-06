import { FormEvent, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../navigation/paths";
import SelectPropertyType from "../../components/SelectPropertyType";
import { PropertyType } from "../../../models/property";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  height: 360px;
`;

const FiltersContainer = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  width: 100%;
  background-image: url("src/assets/background-mudanza.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const InputText = styled(TextField)`
  min-width: 220px; 
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

const MainFilters = () => {
  const [tipoInmueble, seTtipoInmueble] = useState<PropertyType>("APARTMENT");
  const [textSearch, setTextSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(paths.properties);
  };

  return (
    <Wrapper>
      <FiltersContainer onSubmit={handleSearch}>
        <SelectPropertyType selectedPropertyType={tipoInmueble} setSelectedPropertyType={seTtipoInmueble}/>

        <InputText
          id="input-text"
          size="small"
          value={textSearch}
          placeholder="Ingresá un barrio o ubicación"
          onChange={(e) => setTextSearch(e.target.value)}
          sx={{
            "& .MuiInputBase-input": {
              py: 0.75, fontSize: "0.875rem"
            }
          }}
        />

        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "capitalize"
          }}
          type="submit"
        >
          Buscar
        </Button>
      </FiltersContainer>
    </Wrapper>
  );
};

export default MainFilters;
