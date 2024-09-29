import styled from "styled-components";
import { MenuItem, TextField } from "@mui/material";
import { SortBy } from "../../../models/property";
import { getSortByType } from "../../../helpers";

type SortTypes = Array<
  {
    value: SortBy,
    label: string
  }
>

const sortTypes: SortTypes = [
  {
    value: "PRICE_ASC",
    label: getSortByType("PRICE_ASC")
  },
  {
    value: "PRICE_DESC",
    label: getSortByType("PRICE_DESC")
  },
  {
    value: "RECENT",
    label: getSortByType("RECENT")
  }
];

const Select = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

interface SelectSortTypeProps {
  selectedSortType: SortBy,
  setSelectedSortType: (sortBy: SortBy) => void
}

const SelectSortType = ({ selectedSortType, setSelectedSortType }: SelectSortTypeProps) => {
  return (
    <Select
      id="select-tipo-inmueble"
      size="small"
      select
      value={selectedSortType}
      onChange={(e) => setSelectedSortType(e.target.value as SortBy)}
      sx={{
        "& .MuiInputBase-input": {
          py: 0.75, fontSize: "0.875rem"
        }
      }}
    >
      {sortTypes.map((sortType) => (
        <MenuItem key={sortType.value} value={sortType.value}>
          {sortType.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectSortType;
