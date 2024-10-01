import { PropertyType, SortBy } from "./models/property";
import { RentProcessStatus, RentStatus } from "./models/rentals";
import PricePrediction from "./ui/pages/PropertyDetails/PricePredictionContainer";

export const formatNumberToCurrency = ({ number, truncateDecimals = true }: {number: number, truncateDecimals?: boolean}): string => {
  const strNumber = number.toString();
  const dotIndex = strNumber.indexOf(".");

  let formattedNumber = parseFloat(strNumber).toString();
  if (dotIndex !== -1 && truncateDecimals) {
    formattedNumber = strNumber.substring(0, dotIndex);
  }

  return new Intl.NumberFormat("es-AR").format(
    Number(formattedNumber)
  );
};

export const getPropertyTypeNameByType = (propertyType: PropertyType) => {
  switch(propertyType) {
    case "HOUSE":
      return "Casa";
    case "APARTMENT":
      return "Departamento";
    case "PH":
      return "PH";
    case "ALL":
      return "Todos";
    default:
      return "";
  }
};

export const getPriceClassificationByName = (classification: string) => {
  switch(classification) {
    case "ECONOMICAL":
      return PricePrediction({
        color: "#58d68d", fontColor: "#1d8348", wording: "MUY BARATO"
      });
    case "AFFORDABLE":
      return PricePrediction({
        color: "#27ae60", fontColor: "#196f3d", wording: "BARATO"
      });
    case "MARKET_PRICE":
      return PricePrediction({
        color: "#f7dc6f", fontColor: "#9a7d0a", wording: "PRECIO DE MERCADO"
      });
    case "PREMIUM":
      return PricePrediction({
        color: "#dc7633", fontColor: "#873600", wording: "CARO"
      });
    case "LUXURY":
      return PricePrediction({
        color: "#e74c3c", fontColor: "#641e16", wording: "MUY CARO"
      });
  }
};

export const getRentStatusNameByStatus = (rentStatus: RentStatus) => {
  switch(rentStatus) {
    case "PENDING_PAYMENT":
      return "Pendiente de Pago";
    case "ACTIVE":
      return "Activo";
    case "COMPLETED":
      return "Completado";
    case "CANCELLED":
      return "Cancelado";
    default:
      return "";
  }
};

export const getSortByType = (sortBy: SortBy) => {
  switch(sortBy) {
    case "RECENT":
      return "Mas recientes";
    case "PRICE_DESC":
      return "Mayor precio";
    case "PRICE_ASC":
      return "Menor precio";
    default:
      return "";
  }
};

export const getRentProcessStatusNameByStatus = (rentProcessStatus: RentProcessStatus) => {
  switch(rentProcessStatus) {
    case "PENDING_APPROVAL":
      return "Pendiente de Aprobación";
    case "ACCEPTED":
      return "Aceptado";
    case "PENDING_CONTRACT":
      return "Contrato Pendiente";
    case "CONTRACT_CREATED":
      return "Contrato Creado";
    case "SUCCESS":
      return "Proceso Exitoso";
    default:
      return "";
  }
};

export const isMobileMediaQuery = "(max-width:600px)";

export const isNumber = (str: string) => {
  const numberRegex = new RegExp("^[0-9]*$");
  return numberRegex.test(str);
};
