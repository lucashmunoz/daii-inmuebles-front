import { FormEvent, useState } from "react";
import styled from "styled-components";
import { Button } from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
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
  background-image: url("/src/assets/background-mudanza.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  @media only screen and (min-width: 600px) {
    flex-direction: row;
  }
`;

const MainFilters = () => {
  const [propertyType, setPropertyType] = useState<PropertyType>("APARTMENT");

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate({
      pathname: paths.properties,
      search: `?${createSearchParams({
        type: propertyType
      })}`
    });
  };

  return (
    <Wrapper>
      <FiltersContainer onSubmit={handleSearch}>
        <SelectPropertyType
          selectedPropertyType={propertyType}
          setSelectedPropertyType={setPropertyType}
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
