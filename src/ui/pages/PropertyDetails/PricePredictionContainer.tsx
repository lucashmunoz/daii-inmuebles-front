import styled from "styled-components";

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

interface PricePredictionProps {
  color: string;
  wording: string;
  fontColor: string;
}

const PricePrediction = ({ color, fontColor, wording }: PricePredictionProps) => {
  return (
    <PricePredictionContainer color={color} $fontColor={fontColor}>
      {wording}
    </PricePredictionContainer>
  );
};

export default PricePrediction;
