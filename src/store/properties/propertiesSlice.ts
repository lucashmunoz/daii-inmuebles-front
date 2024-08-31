import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface Property {
  name: string
}

interface PropertyState {
 properties: Property[]
}
  
const initialState: PropertyState = {
  properties: [] 
};
  
export const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {}
});
    
export const selectProperties = (state: RootState) => state.properties.properties;
  
export default propertiesSlice.reducer;
