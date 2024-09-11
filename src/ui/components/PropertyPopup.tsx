import styled from "styled-components";

interface PropertyPopupProps {
  id: number;
  imageUrl?: string;
  title?: string;
  price?: string;
  location?: string;
  navigate: (path: string) => void;
}

const PopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  background-color: white;
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
  cursor: pointer;
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

export const PropertyPopup = ({ id, imageUrl, title, price, location, navigate }: PropertyPopupProps) => {
  const handleImageClick = () => {
    navigate(`/properties/${id}`);
  };

  return (
    <PopupContainer>
      <PopupImageContainer onClick={handleImageClick}>
        {imageUrl && <PopupImage src={imageUrl} alt={title} />}
      </PopupImageContainer>
      <PopupDetails>
        {title && <PopupTitle>{title}</PopupTitle>}
        {price && <PopupPrice>{price}</PopupPrice>}
        {location && <PopupLocation>{location}</PopupLocation>}
      </PopupDetails>
    </PopupContainer>
  );
};
