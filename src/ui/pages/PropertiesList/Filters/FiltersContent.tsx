import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SelectPropertyType from "../../../components/SelectPropertyType";
import { PropertyType, SurfaceType } from "../../../../models/property";
import { isNumber } from "../../../../helpers";
import { useSearchParams } from "react-router-dom";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { useState } from "react";
import { Filters } from "../../../../store/properties/propertiesSlice";

const ResetButtonContainer = styled.div`
  width: 100%;
  display: flex; 
  justify-content: flex-end;
`;

const ResetButton = styled.button`
  border: none;
  background: none;
  padding: 8px 0 0 8px;
  cursor: pointer;
`;

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
  const [filtersState, setFilstersState] = useState<Filters>({
    type: filtersParams.get("type") as PropertyType || "APARTMENT",
    minPrice: filtersParams.get("minPrice") || "",
    maxPrice: filtersParams.get("maxPrice") || "",
    minSurface: filtersParams.get("minSurface") || "",
    maxSurface: filtersParams.get("maxSurface") || "",
    surfaceType: filtersParams.get("surfaceType") as SurfaceType || "COVERED",
    minBeds: filtersParams.get("minBeds") || "",
    maxBeds: filtersParams.get("maxBeds") || "",
    minRooms: filtersParams.get("minRooms") || "",
    maxRooms: filtersParams.get("maxRooms") || "",
    minBathrooms: filtersParams.get("minBathrooms") || "",
    maxBathrooms: filtersParams.get("maxBathrooms") || ""
  });

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
  } = filtersState;

  const handleResetFilters = () => {
    filtersParams.delete("minPrice");
    filtersParams.delete("maxPrice");
    filtersParams.delete("minSurface");
    filtersParams.delete("maxSurface");
    filtersParams.delete("surfaceType");
    filtersParams.set("surfaceType", "COVERED");
    filtersParams.delete("minBeds");
    filtersParams.delete("maxBeds");
    filtersParams.delete("minRooms");
    filtersParams.delete("maxRooms");
    filtersParams.delete("minBathrooms");
    filtersParams.delete("maxBathrooms");
    setFiltersParams(filtersParams);
    setFilstersState({
      type: "APARTMENT",
      minPrice: "",
      maxPrice: "",
      minSurface: "",
      maxSurface: "",
      surfaceType: "COVERED",
      minBeds: "",
      maxBeds: "",
      minRooms: "",
      maxRooms: "",
      minBathrooms: "",
      maxBathrooms: ""
    });
  };

  return (
    <div>
      <ResetButtonContainer>
        <ResetButton aria-label="Reiniciar filtros" type="button" onClick={handleResetFilters}>
          <RestartAltOutlinedIcon />
        </ResetButton>
      </ResetButtonContainer>
      <FilterContainer>
        <FilterTitle>Tipo de inmueble</FilterTitle>
        <SelectPropertyType
          selectedPropertyType={type as PropertyType}
          setSelectedPropertyType={(value) => {
            setFiltersParams((prev) => {
              prev.set("type", value);
              return prev;
            });
            setFilstersState((prev) => ({
              ...prev,
              type: value
            }));
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
              setFilstersState((prev) => ({
                ...prev,
                minPrice: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                maxPrice: value
              }));
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
            setFilstersState((prev) => ({
              ...prev,
              surfaceType: value as SurfaceType
            }));
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
              setFilstersState((prev) => ({
                ...prev,
                minSurface: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                maxSurface: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                minBeds: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                maxBeds: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                minRooms: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                maxRooms: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                minBathrooms: value
              }));
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
              setFilstersState((prev) => ({
                ...prev,
                maxBathrooms: value
              }));
            }}
          />
        </TwoInputsContainer>
      </FilterContainer>
    </div>
  );
};

export default FiltersContent;
