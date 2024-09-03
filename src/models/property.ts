export type SortBy = "PRICE_ASC" | "PRICE_DESC" | "RECENT"
export type PropertyType = "HOUSE" | "APARTMENT" | "DUPLEX" | "PENTHOUSE"

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
  active: true,
  surface_covered: number,
  surface_total: number,
  user_id: number,
  created_at: Date
}
