import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectProperties, selectLoadingProperties, fetchProperties, selectIsPropertiesError } from "../../../store/properties/propertiesSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import { formatNumberToCurrency } from "../../../helpers";

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 28px 20px;
`;

const Title = styled.h2`
  text-align: center;
`;

const CarouselContainer = styled.div`
  align-self: center;
  max-width: 800px;
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
    items: 3
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

;

const InmueblesRecientes = () => {
  const dispatch = useAppDispatch();
  const properties = useAppSelector(selectProperties);
  const loadingProperties = useAppSelector(selectLoadingProperties);
  const isPropertiesError = useAppSelector(selectIsPropertiesError);

  console.log(isPropertiesError);

  useEffect(() => {
    dispatch(fetchProperties({
      sortBy: "RECENT" 
    })); 
  }, [dispatch]);
  
  if (loadingProperties) {
    return (
      <Wrapper>
        <LoadingSkeleton />
      </Wrapper>
    );
  }
  
  if (isPropertiesError) {
    return (
      <Wrapper>
        <Alert severity="error">
          Ocurrio un error al mostrar los inmuebles recientes.
        </Alert>
      </Wrapper>
    );
  }
  
  return (
    <Wrapper>
      <Title>Inmuebles Publicados Recientemente</Title>

      <CarouselContainer>
        <Carousel responsive={responsive}>
          {properties.map(property => {
            const { id, images, price, description } = property;
            const image = images[0];
            const formattedPrice = formatNumberToCurrency({
              number: price 
            });

            return (
              <Card key={id} sx={{
                maxWidth: 200, height: 280 
              }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="120"
                    image={image}
                    alt="inmueble publicado recientemente"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      ${formattedPrice}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: "text.secondary" 
                    }}>
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card> 
            );
          })}
        </Carousel>
      </CarouselContainer>
    
    </Wrapper>
  );
};

export default InmueblesRecientes;
