export type SortBy = "PRICE_ASC" | "PRICE_DESC" | "RECENT"
export type PropertyType = "APARTMENT" | "HOUSE" | "SEMIFLOOR" | "FLOOR" | "DUPLEX" | "TRIPLEX" | "PENTHOUSE"
export type PropertyContractStatus = "AL_DIA" | "VENCIDO"

export interface Property {
  id: number,
  beds: number,
  bathrooms: number,
  country: string,
  city: string,
  state: string,
  rooms: number,
  title: string,
  description: string,
  district: string
  latitude: number,
  longitude: number,
  images: [
    string
  ],
  address: string,
  storeys: number,
  price: number,
  garages: number,
  type: PropertyType,
  surface_covered: number,
  surface_total: number,
}
