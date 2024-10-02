import { getPropertyTypeNameByType } from "../../../helpers";
import { PropertyType } from "../../../models/property";
import { FormPropertyData } from "./PropertyForm";

export const isPropertyFormValid = (formData: FormPropertyData): boolean => {
  const {
    beds,
    zipcode,
    bathrooms,
    country,
    city,
    state,
    district,
    rooms,
    title,
    description,
    latitude,
    longitude,
    images,
    address,
    price,
    garages,
    type,
    surface_covered,
    surface_total
  } = formData;

  return beds.length !== 0 &&
  zipcode.length !== 0 &&
  bathrooms.length !== 0 &&
  country.length !== 0 &&
  city.length !== 0 &&
  state.length !== 0 &&
  district.length !== 0 &&
  rooms.length !== 0 &&
  title.length !== 0 &&
  description.length !== 0 &&
  latitude !== 0 &&
  longitude !== 0 &&
  images.length !== 0 &&
  address.length !== 0 &&
  price.length !== 0 &&
  garages.length !== 0 &&
  type.length !== 0 &&
  surface_covered.length !== 0 &&
  surface_total.length !== 0;
};

type PropertiesTypes = Array<
  {
    value: PropertyType,
    label: string
  }
>

export const propertiesTypes: PropertiesTypes = [
  {
    value: "APARTMENT",
    label: getPropertyTypeNameByType("APARTMENT")
  },
  {
    value: "HOUSE",
    label: getPropertyTypeNameByType("HOUSE")
  },
  {
    value: "PH",
    label: getPropertyTypeNameByType("PH")
  }
];
