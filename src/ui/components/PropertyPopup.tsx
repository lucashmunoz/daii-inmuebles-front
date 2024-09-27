import styled from "styled-components";
import { paths } from "../../navigation/paths";
import { formatNumberToCurrency } from "../../helpers";

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
  cursor: pointer;
`;

const PopupImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
`;

const PopupImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PopupDetails = styled.div`
  padding: 10px;
  box-sizing: border-box;
`;

const PopupTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin: 5px 0;
`;

const PopupPrice = styled.p`
  font-size: 18px;
  color: #1b1b1b;
  margin: 5px 0;
`;

const PopupLocation = styled.p`
  font-size: 14px;
  color: #777;
  margin: 5px 0;
`;

interface PropertyPopupProps {
  id: number;
  image: string;
  title: string;
  price: number;
  district: string;
}

export const PropertyPopup = ({ id, image, title, price, district }: PropertyPopupProps) => {
  const handleImageClick = () => {
    window.open(`${paths.properties}/${id}`);
  };

  const formattedPrice = formatNumberToCurrency({
    number: price
  });

  return (
    <PopupContainer onClick={handleImageClick}>
      <PopupImageContainer>
        <PopupImage src={image} alt={title} />
      </PopupImageContainer>
      <PopupDetails>
        <PopupTitle>{title}</PopupTitle>
        <PopupPrice>${formattedPrice}</PopupPrice>
        <PopupLocation>{district}</PopupLocation>
      </PopupDetails>
    </PopupContainer>
  );
};
