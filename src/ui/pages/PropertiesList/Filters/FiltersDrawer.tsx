import { Button, Drawer } from "@mui/material";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FiltersContent from "./FiltersContent";
import { FormEvent, useContext } from "react";
import PropertiesFiltersContext from "../../../../context/PropertiesFiltersContext";
import { useAppDispatch } from "../../../../store/hooks";
import { fetchProperties } from "../../../../store/properties/propertiesSlice";

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
  const { filters } = useContext(PropertiesFiltersContext);

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
