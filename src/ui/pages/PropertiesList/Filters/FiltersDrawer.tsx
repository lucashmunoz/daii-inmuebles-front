import { Button, Drawer } from "@mui/material";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FiltersContent from "./FiltersContent";
import { FormEvent } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchProperties } from "../../../../store/properties/propertiesSlice";
import { useSearchParams } from "react-router-dom";
import { PropertyType, SurfaceType } from "../../../../models/property";

const DrawerContentContainer = styled.form`
  width: 280px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CloseButtonHeader = styled.div`
   display: flex;
   width: 100%;
   justify-content: flex-end;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
`;

const DrawerFooter = styled.div`
   position: fixed;
   bottom: 0px;
   padding: 10px;
   display: flex;
   width: 280px;
   justify-content: center;
`;

const FullWidthButton = styled(Button)`
  width: 100%;
`;

interface FiltersDrawerProps {
  isFiltersDrawerOpen: boolean
  closeCallback: () => void
}

const FiltersDrawer = ({ isFiltersDrawerOpen, closeCallback }: FiltersDrawerProps) => {
  const dispatch = useAppDispatch();

  const [filtersParams] = useSearchParams();

  const filters = {
    type: (filtersParams.get("type") || "") as PropertyType,
    minPrice: filtersParams.get("minPrice") || "",
    maxPrice: filtersParams.get("maxPrice") || "",
    minSurface: filtersParams.get("minSurface") || "",
    maxSurface: filtersParams.get("maxSurface") || "",
    surfaceType: (filtersParams.get("surfaceType") || "") as SurfaceType,
    minBeds: filtersParams.get("minBeds") || "",
    maxBeds: filtersParams.get("maxBeds") || "",
    minRooms: filtersParams.get("minRooms") || "",
    maxRooms: filtersParams.get("maxRooms") || "",
    minBathrooms: filtersParams.get("minBathrooms") || "",
    maxBathrooms: filtersParams.get("maxBathrooms") || "",
    districts: filtersParams.get("districts") || ""
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    dispatch(fetchProperties({
      filters
    }));
    closeCallback();
  };

  return (
    <Drawer
      open={isFiltersDrawerOpen}
      onClose={closeCallback}
    >
      <DrawerContentContainer onSubmit={handleSearch}>
        <CloseButtonHeader >
          <CloseButton onClick={closeCallback} type="button">
            <CloseOutlinedIcon />
          </CloseButton>
        </CloseButtonHeader>

        <FiltersContent />

        <DrawerFooter>
          <FullWidthButton
            variant="contained"
            size="large"
            type="submit"
          >
            Aplicar Filtros
          </FullWidthButton>
        </DrawerFooter>
      </DrawerContentContainer>
    </Drawer>
  );};

export default FiltersDrawer;
