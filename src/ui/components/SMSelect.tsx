import styled from "styled-components";
import { MenuItem, TextField } from "@mui/material";

export interface OptionType {
    value: string,
    label: string
  }

const Select = styled(TextField)`
  & .MuiInputBase-root {
    background-color: #fefefe;
  }
`;

interface SelectDistrictProps {
  id: string
  options: OptionType[]
  selectedOption: string
  setSelectedOption: (selectedOption: string) => void
  className?: string
}

const SMSelect = ({ id, options, selectedOption, setSelectedOption, className }: SelectDistrictProps) => {
  return (
    <Select
      id={id}
      size="small"
      select
      className={className}
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value as string)}
      sx={{
        "& .MuiInputBase-input": {
          fontSize: "0.875rem",
          height: "100&"
        }
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SMSelect;
