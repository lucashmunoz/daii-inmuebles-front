import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { fetchRecentProperties, selectIsRecentPropertiesError, selectLoadingRecentProperties, selectRecentProperties } from "../../../store/properties/propertiesSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import { PropertyCard } from "../../components/PropertyCard";
import useMediaQuery from "@mui/material/useMediaQuery";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const Title = styled.h2`
  text-align: center;
  padding-bottom: 16px;
`;

const HorizontalCardContainer = styled.div`
  padding: 16px 0;
`;

const CarouselContainer = styled.div`
  align-self: center;
  max-width: 1024px;
  width: 100%;
`;

const responsive = {
  superLargeDesktop: {
    breakpoint: {
      max: 4000, min: 3000
    },
    items: 5
  },
  desktop: {
    breakpoint: {
      max: 3000, min: 1024
    },
    items: 4
  },
  tablet: {
    breakpoint: {
      max: 1024, min: 464
    },
    items: 2
  },
  mobile: {
    breakpoint: {
      max: 464, min: 0
    },
    items: 1
  }
};

const InmueblesRecientes = () => {
  const dispatch = useAppDispatch();
  const recentProperties = useAppSelector(selectRecentProperties);
  const loadingRecentProperties = useAppSelector(selectLoadingRecentProperties);
  const isRecentPropertiesError = useAppSelector(selectIsRecentPropertiesError);

  const isMobile = useMediaQuery(isMobileMediaQuery);

  useEffect(() => {
    dispatch(fetchRecentProperties());
  }, [dispatch]);

  if (loadingRecentProperties) {
    return (
      <Wrapper>
        <LoadingSkeleton />
      </Wrapper>
    );
  }

  if (isRecentPropertiesError) {
    return (
      <Wrapper>
        <Alert severity="error">
        Ocurrió un error al mostrar los inmuebles recientes.
        </Alert>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Title>Inmuebles Publicados Recientemente</Title>

      {
        isMobile ? recentProperties.map(property => {
          const { id, images, price, district, rooms, surface_total, beds, bathrooms, type } = property;
          const image = images[0];
          const formattedPrice = formatNumberToCurrency({
            number: price
          });

          return (
            <HorizontalCardContainer key={id}>
              <PropertyCard
                orientation="horizontal"
                id={id}
                image={image}
                district={district}
                price={formattedPrice}
                rooms={rooms}
                beds={beds}
                bathrooms={bathrooms}
                surfaceTotal={surface_total}
                type={type}
              />
            </HorizontalCardContainer>
          );
        })
          : <CarouselContainer>
            <Carousel responsive={responsive}>
              {recentProperties.map(property => {
                const { id, images, price, district, rooms, surface_total, beds, bathrooms, type } = property;
                const image = images[0];
                const formattedPrice = formatNumberToCurrency({
                  number: price
                });

                return (
                  <PropertyCard
                    orientation="vertical"
                    key={id}
                    id={id}
                    image={image}
                    district={district}
                    price={formattedPrice}
                    rooms={rooms}
                    beds={beds}
                    bathrooms={bathrooms}
                    surfaceTotal={surface_total}
                    type={type}
                  />
                );
              })}
            </Carousel>
          </CarouselContainer>

      }

    </Wrapper>
  );
};

export default InmueblesRecientes;
