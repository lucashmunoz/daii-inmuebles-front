import { createContext } from "react";
import { PropertyType, SurfaceType } from "../models/property";

interface Filters {
  type: PropertyType
  textSearch: string
  minPrice: string
  maxPrice: string
  minSurface: string
  maxSurface: string
  surfaceType: SurfaceType
  minBeds: string
  maxBeds: string
  minRooms: string
  maxRooms: string
  minBathrooms: string
  maxBathrooms: string
}

export interface PropertiesFiltersContextType {
  filters: Filters,
  setFilters: (newFilters: Filters) => void
}

export const initialPropertiesFiltersState: PropertiesFiltersContextType = {
  filters: {
    type: "APARTMENT",
    textSearch: "",
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
  },
  setFilters: () => {}
};

const PropertiesFiltersContext = createContext<PropertiesFiltersContextType>(initialPropertiesFiltersState);

export default PropertiesFiltersContext;
