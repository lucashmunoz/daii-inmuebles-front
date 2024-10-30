export type SortBy = "PRICE_ASC" | "PRICE_DESC" | "RECENT"

export type PropertyType = "APARTMENT" | "HOUSE" | "PH" | "ALL" | ""

export type SurfaceType = "COVERED" | "TOTAL"

export type PropertyClassification = "ECONOMICAL" | "AFFORDABLE" | "MARKET_PRICE" | "PREMIUM" | "LUXURY" | ""

export interface Property {
  id: number,
  active: boolean,
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
  images: string[],
  address: string,
  price: number,
  type: PropertyType,
  surface_covered: number,
  surface_total: number,
  created_at: string,
  favorite: boolean,
  zipcode: string,
  owner_id: number,
  rented?: boolean,
  disable: boolean
  delete?: boolean
}
