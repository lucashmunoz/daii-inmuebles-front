import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SelectPropertyType from "../../../components/SelectPropertyType";
import { PropertyType } from "../../../../models/property";
import { isNumber } from "../../../../helpers";
import { useSearchParams } from "react-router-dom";

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
  const [filtersParams, setFiltersParams] = useSearchParams();

  const type = filtersParams.get("type");
  const minPrice = filtersParams.get("minPrice");
  const maxPrice = filtersParams.get("maxPrice");
  const minSurface = filtersParams.get("minSurface");
  const maxSurface = filtersParams.get("maxSurface");
  const surfaceType = filtersParams.get("surfaceType");
  const minBeds = filtersParams.get("minBeds");
  const maxBeds = filtersParams.get("maxBeds");
  const minRooms = filtersParams.get("minRooms");
  const maxRooms = filtersParams.get("maxRooms");
  const minBathrooms = filtersParams.get("minBathrooms");
  const maxBathrooms = filtersParams.get("maxBathrooms");

  return (
    <div>
      <FilterContainer>
        <FilterTitle>Tipo de inmueble</FilterTitle>
        <SelectPropertyType
          selectedPropertyType={type as PropertyType}
          setSelectedPropertyType={(value) => {
            setFiltersParams((prev) => {
              prev.set("type", value);
              return prev;
            });
          }}
        />
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
              setFiltersParams((prev) => {
                prev.set("minPrice", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("maxPrice", value);
                return prev;
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
            setFiltersParams((prev) => {
              prev.set("surfaceType", value);
              return prev;
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
              setFiltersParams((prev) => {
                prev.set("minSurface", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("maxSurface", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("minBeds", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("maxBeds", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("minRooms", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("maxRooms", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("minBathrooms", value);
                return prev;
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
              setFiltersParams((prev) => {
                prev.set("maxBathrooms", value);
                return prev;
              });
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>
    </div>
  );
};

export default FiltersContent;
