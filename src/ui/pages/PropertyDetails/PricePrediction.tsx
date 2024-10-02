import styled from "styled-components";
import { PropertyClassification } from "../../../models/property";
import { useSelector } from "react-redux";
import { selectPricePredictionClassification } from "../../../store/properties/propertyDetailsSlice";
import { Tooltip as MUITooltip, tooltipClasses, TooltipProps } from "@mui/material";

const PricePredictionContainer = styled.div<{color: string, $fontColor: string}>`
  display: flex;
  justify-content: center;
  padding: 6px;
  font-size: 16px;
  color: ${(props) => props.$fontColor};
  background-color: ${(props) => props.color};
  border-radius: 12px;
  margin-bottom: 15px;
`;

const Tooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{
    popper: className
  }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14
  }
}));

const getPriceClassification = (classification: PropertyClassification) => {
  switch(classification) {
    case "ECONOMICAL":
      return {
        color: "#58d68d", fontColor: "#1d8348", text: "MUY BARATO"
      };
    case "AFFORDABLE":
      return {
        color: "#27ae60", fontColor: "#196f3d", text: "BARATO"
      };
    case "MARKET_PRICE":
      return {
        color: "#f7dc6f", fontColor: "#9a7d0a", text: "PRECIO DE MERCADO"
      };
    case "PREMIUM":
      return {
        color: "#dc7633", fontColor: "#873600", text: "CARO"
      };
    case "LUXURY":
      return {
        color: "#e74c3c", fontColor: "#641e16", text: "MUY CARO"
      };
    default:
      return {
        color: "#e74c3c", fontColor: "#641e16", text: "MUY CARO"
      };
  }
};

const PricePrediction = () => {
  const priceClassification = useSelector(selectPricePredictionClassification);

  const { color, fontColor, text } = getPriceClassification(priceClassification);

  if(priceClassification.length === 0) {
    return null;
  }

  return (
    <Tooltip
      title="El precio estimado es una aproximación basada en las características de la propiedad en comparación con otras del mercado."
      placement="right"
      arrow
    >
      <PricePredictionContainer color={color} $fontColor={fontColor}>
        {text}
      </PricePredictionContainer>
    </Tooltip>
  );
};

export default PricePrediction;
