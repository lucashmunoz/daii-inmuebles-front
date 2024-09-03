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
