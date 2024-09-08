import { PropertyContractStatus, PropertyType } from "./models/property";

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
    case "SEMIFLOOR":
      return "Semipiso";
    case "FLOOR":
      return "Piso";
    case "DUPLEX":
      return "Duplex";
    case "TRIPLEX":
      return "Triplex";
    case "PENTHOUSE":
      return "Penthouse";
    default:
      return "";
  }
};

export const getContractStatusNameByType = (contractStatus: PropertyContractStatus) => {
  switch(contractStatus) {
    case "AL_DIA":
      return "Al día";
    case "VENCIDO":
      return "Vencido";
    default:
      return "";
  }
};

export const isMobileMediaQuery = "(max-width:600px)";

export const isNumber = (str: string) => {
  const numberRegex = new RegExp("^[0-9]*$");
  return numberRegex.test(str);
};
