import { Box, Drawer, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import TextField from "@mui/material/TextField";
import styled from "styled-components";

const FilterContainer = styled.div`
  padding: 8px 0; 
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
      <Box
        sx={{
          width: 280, padding: "16px"
        }}
        role="presentation"
      >
        <FilterContainer>
          <FilterTitle>Precio</FilterTitle>
          <TwoInputsContainer>
            <InputText
              id="input-price-from"
              size="small"
              placeholder="Desde"
            />
            <InputText
              id="input-price-to"
              size="small"
              placeholder="hasta"
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
          >
            <FormControlLabel value="covered" control={<Radio />} label="Cubierta" />
            <FormControlLabel value="total" control={<Radio />} label="Total" />
          </RadioGroup>
          <TwoInputsContainer>
            <InputText
              id="input-surface-from"
              size="small"
              placeholder="Desde"
            />
            <InputText
              id="input-surface-to"
              size="small"
              placeholder="hasta"
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
            />
            <InputText
              id="input-rooms-to"
              size="small"
              placeholder="hasta"
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
            />
            <InputText
              id="input-bathrooms-to"
              size="small"
              placeholder="hasta"
            />
          </TwoInputsContainer>
        </FilterContainer>
      </Box>
    </Drawer>
  );};

export default FiltersDrawer;

/*
  <List>
    {["Inbox", "Starred", "Send email", "Drafts"].map((text) => (
      <ListItem key={text} disablePadding>
        <ListItemButton>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
*/
