import { Button, Drawer } from "@mui/material";
import styled from "styled-components";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FiltersContent from "./FiltersContent";

const DrawerContentContainer = styled.div`
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
  return (
    <Drawer
      open={isFiltersDrawerOpen}
      onClose={closeCallback}
    >
      <DrawerContentContainer>
        <CloseButtonHeader onClick={closeCallback}>
          <CloseButton>
            <CloseOutlinedIcon />
          </CloseButton>
        </CloseButtonHeader>

        <FiltersContent />

        <DrawerFooter>
          <FullWidthButton
            variant="contained"
            size="large"
            onClick={closeCallback}
          >
            Aplicar Filtros
          </FullWidthButton>
        </DrawerFooter>
      </DrawerContentContainer>
    </Drawer>
  );};

export default FiltersDrawer;
