import { ReactElement, useState } from "react";
import styled from "styled-components";

const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
`;

const CarouselInner = styled.div<{ $currentIndex: number }>`
  display: flex;
  height: 100%;
  transition: transform 0.5s ease-in-out;
  transform: ${({ $currentIndex }) => `translateX(-${$currentIndex * 100}%)`};
`;

const CarouselItem = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

const ControlsWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
  z-index: 2;
`;

const ControlButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.7);
  }
`;

interface CarrouselProps {
  images: string[];
}

const Carousel = ({ images }: CarrouselProps): ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <CarouselWrapper>
      <CarouselInner $currentIndex={currentIndex}>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <CarouselImage src={image} alt={`Slide ${index + 1}`} />
          </CarouselItem>
        ))}
      </CarouselInner>
      <ControlsWrapper>
        <ControlButton onClick={handlePrev}>{"<"}</ControlButton>
        <ControlButton onClick={handleNext}>{">"}</ControlButton>
      </ControlsWrapper>
    </CarouselWrapper>
  );
};

export default Carousel;
