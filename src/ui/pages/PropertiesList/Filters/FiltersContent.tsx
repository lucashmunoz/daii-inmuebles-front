import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SelectPropertyType from "../../../components/SelectPropertyType";
import { useContext } from "react";
import PropertiesFiltersContext from "../../../../context/PropertiesFiltersContext";
import { SurfaceType } from "../../../../models/property";
import { isNumber } from "../../../../helpers";

const FilterContainer = styled.div`
  padding: 8px 0; 
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const FilterTitle = styled.h3`
  font-weight: bold; 
  padding: 8px 0; 
`;

const TwoInputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const InputText = styled(TextField)`
  flex: 1; 
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

const FiltersContent = () => {
  const { filters, setFilters } = useContext(PropertiesFiltersContext);

  const {
    type,
    minPrice,
    maxPrice,
    minSurface,
    maxSurface,
    surfaceType,
    minBeds,
    maxBeds,
    minRooms,
    maxRooms,
    minBathrooms,
    maxBathrooms
  } = filters;

  return (
    <div>
      <FilterContainer>
        <FilterTitle>Tipo de inmueble</FilterTitle>
        <SelectPropertyType selectedPropertyType={type} setSelectedPropertyType={(value) => {
          setFilters({
            ...filters, type: value
          });
        }}/>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Precio</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-price-from"
            size="small"
            placeholder="Desde"
            value={minPrice}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, minPrice: value
              });
            }}
          />
          <InputText
            id="input-price-to"
            size="small"
            placeholder="Hasta"
            value={maxPrice}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, maxPrice: value
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Superficie</FilterTitle>
        <FormLabel
          id="radio-surface-type"
          sx={{
            display: "none"
          }}
        >
            Superficie
        </FormLabel>
        <RadioGroup
          aria-labelledby="radio-surface-type"
          row
          defaultValue="covered"
          name="radio-buttons-group"
          value={surfaceType}
          onChange={(e) => {
            const { value } = e.target;
            setFilters({
              ...filters, surfaceType: value as SurfaceType
            });
          }}
        >
          <FormControlLabel value="COVERED" control={<Radio />} label="Cubierta" />
          <FormControlLabel value="TOTAL" control={<Radio />} label="Total" />
        </RadioGroup>
        <TwoInputsContainer>
          <InputText
            id="input-surface-from"
            size="small"
            placeholder="Desde"
            value={minSurface}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, minSurface: value
              });
            }}
          />
          <InputText
            id="input-surface-to"
            size="small"
            placeholder="Hasta"
            value={maxSurface}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, maxSurface: value
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Dormitorios</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-beds-from"
            size="small"
            placeholder="Desde"
            value={minBeds}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, minBeds: value
              });
            }}
          />
          <InputText
            id="input-beds-to"
            size="small"
            placeholder="Hasta"
            value={maxBeds}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, maxBeds: value
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Ambientes</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-rooms-from"
            size="small"
            placeholder="Desde"
            value={minRooms}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, minRooms: value
              });
            }}
          />
          <InputText
            id="input-rooms-to"
            size="small"
            placeholder="Hasta"
            value={maxRooms}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, maxRooms: value
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Baños</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-bathrooms-from"
            size="small"
            placeholder="Desde"
            value={minBathrooms}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, minBathrooms: value
              });
            }}
          />
          <InputText
            id="input-bathrooms-to"
            size="small"
            placeholder="Hasta"
            value={maxBathrooms}
            onChange={(e) => {
              const { value } = e.target;
              if(!isNumber(value)) {
                return;
              }
              setFilters({
                ...filters, maxBathrooms: value
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>
    </div>
  );
};

export default FiltersContent;
