import { Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";
import SelectPropertyType from "../../../components/SelectPropertyType";
import { PropertyType, SortBy, SurfaceType } from "../../../../models/property";
import { isNumber } from "../../../../helpers";
import { useSearchParams } from "react-router-dom";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Filters } from "../../../../store/properties/propertiesSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { fetchDistricts, selectDistricts } from "../../../../store/properties/districtsSlice";
import SelectSortType from "../SelectSortType";

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

const DistrictsContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 300px;
  overflow-y: scroll;
  padding: 8px;
`;

const FiltersContent = () => {
  const dispatch = useAppDispatch();

  const allDistrictsArray = useAppSelector(selectDistricts);

  const [filtersParams, setFiltersParams] = useSearchParams();
  const [filtersState, setFilstersState] = useState<Filters>({
    sort: filtersParams.get("sort") as SortBy || "",
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
    maxBathrooms: filtersParams.get("maxBathrooms") || "",
    districts: filtersParams.get("districts") || "",
    minLat: filtersParams.get("minLat") || "",
    maxLat: filtersParams.get("maxLat") || "",
    minLon: filtersParams.get("minLon") || "",
    maxLon: filtersParams.get("maxLon") || ""
  });

  const {
    sort,
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
    maxBathrooms,
    districts
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
    filtersParams.delete("districts");
    filtersParams.delete("minLat");
    filtersParams.delete("maxLat");
    filtersParams.delete("minLon");
    filtersParams.delete("maxLon");
    setFiltersParams(filtersParams);
    setFilstersState({
      sort: "RECENT",
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
      maxBathrooms: "",
      districts: "",
      minLat: "",
      maxLat: "",
      minLon: "",
      maxLon: ""
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if(!isNumber(value)) {
      return;
    }
    setFiltersParams((prev) => {
      prev.set(name, value);
      return prev;
    });
    setFilstersState((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onCheckboxChange = (e: SyntheticEvent, checked: boolean) => {
    const { value } = e.target as HTMLInputElement;
    let newCheckboxesStr = districts.length === 0 ? [] : districts.split(", ");
    if(checked) {
      newCheckboxesStr.push(value);
    }else{
      newCheckboxesStr = newCheckboxesStr.filter(checkboxValue => checkboxValue !== value );
    }
    const newCheckboxesStrArray = newCheckboxesStr.join(", ");
    filtersParams.delete("districts");
    filtersParams.set("districts", newCheckboxesStrArray);
    setFiltersParams(filtersParams);
    setFilstersState((prev) => ({
      ...prev,
      districts: newCheckboxesStrArray
    }));
  };

  useEffect(() => {
    dispatch(fetchDistricts());
  }, [dispatch]);

  return (
    <div>
      <ResetButtonContainer>
        <ResetButton aria-label="Reiniciar filtros" type="button" onClick={handleResetFilters}>
          <RestartAltOutlinedIcon />
        </ResetButton>
      </ResetButtonContainer>
      <FilterContainer>
        <FilterTitle>Ordenar por: </FilterTitle>
        <SelectSortType
          selectedSortType={sort as SortBy}
          setSelectedSortType={(value) => {
            setFiltersParams((prev) => {
              prev.set("sort", value);
              return prev;
            });
            setFilstersState((prev) => ({
              ...prev,
              sort: value
            }));
          }}
        />
      </FilterContainer>
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
        <FilterTitle>Barrios</FilterTitle>
        <DistrictsContainer>
          <FormGroup>
            {
              allDistrictsArray.map(district => (
                <FormControlLabel
                  key={district}
                  control={<Checkbox />}
                  label={district}
                  value={district}
                  checked={districts.split(", ").includes(district)}
                  onChange={onCheckboxChange}
                />
              ))
            }
          </FormGroup>
        </DistrictsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Precio</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-price-from"
            name="minPrice"
            size="small"
            placeholder="Desde"
            value={minPrice}
            onChange={handleInputChange}
          />
          <InputText
            id="input-price-to"
            name="maxPrice"
            size="small"
            placeholder="Hasta"
            value={maxPrice}
            onChange={handleInputChange}
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
          name="surfaceType"
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
            name="minSurface"
            size="small"
            placeholder="Desde"
            value={minSurface}
            onChange={handleInputChange}
          />
          <InputText
            id="input-surface-to"
            name="maxSurface"
            size="small"
            placeholder="Hasta"
            value={maxSurface}
            onChange={handleInputChange}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Dormitorios</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-beds-from"
            name="minBeds"
            size="small"
            placeholder="Desde"
            value={minBeds}
            onChange={handleInputChange}
          />
          <InputText
            id="input-beds-to"
            name="maxBeds"
            size="small"
            placeholder="Hasta"
            value={maxBeds}
            onChange={handleInputChange}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Ambientes</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-rooms-from"
            name="minRooms"
            size="small"
            placeholder="Desde"
            value={minRooms}
            onChange={handleInputChange}
          />
          <InputText
            id="input-rooms-to"
            name="maxRooms"
            size="small"
            placeholder="Hasta"
            value={maxRooms}
            onChange={handleInputChange}
          />
        </TwoInputsContainer>
      </FilterContainer>

      <FilterContainer>
        <FilterTitle>Baños</FilterTitle>
        <TwoInputsContainer>
          <InputText
            id="input-bathrooms-from"
            name="minBathrooms"
            size="small"
            placeholder="Desde"
            value={minBathrooms}
            onChange={handleInputChange}
          />
          <InputText
            id="input-bathrooms-to"
            name="maxBathrooms"
            size="small"
            placeholder="Hasta"
            value={maxBathrooms}
            onChange={handleInputChange}
          />
        </TwoInputsContainer>
      </FilterContainer>
    </div>
  );
};

export default FiltersContent;
