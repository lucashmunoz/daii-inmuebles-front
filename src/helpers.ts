import { PropertyType, SortBy } from "./models/property";
import { RentProcessStatus, RentStatus } from "./models/rentals";

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
