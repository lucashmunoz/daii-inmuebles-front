export const endpoints = {
  user: "/user",
  properties: "/properties",
  propertyDetails: "/properties/{id}",
  rentals: "/rentals",
  rentProcess: "/rent-process",
  districts: "/districts",
  bookmark: "/properties/favorites",
  predictPrice: "/predict"
} as const;
