import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

const inmuebles = [
  {
    id: 1,
    image: "src/assets/background-mudanza.jpg",
    price: 1300,
    description: "Exelente departamento"
  },
  {
    id: 2,
    image: "src/assets/background-mudanza.jpg",
    price: 100,
    description: "Departamento"
  },
  {
    id: 3,
    image: "src/assets/background-mudanza.jpg",
    price: 500,
    description: "PH luminoso"
  },
  {
    id: 4,
    image: "src/assets/background-mudanza.jpg",
    price: 1300,
    description: "Exelente departamento"
  },
  {
    id: 5,
    image: "src/assets/background-mudanza.jpg",
    price: 100,
    description: "Departamento"
  },
  {
    id: 6,
    image: "src/assets/background-mudanza.jpg",
    price: 500,
    description: "PH luminoso"
  },
  {
    id: 7,
    image: "src/assets/background-mudanza.jpg",
    price: 1300,
    description: "Exelente departamento"
  },
  {
    id: 8,
    image: "src/assets/background-mudanza.jpg",
    price: 100,
    description: "Departamento"
  },
  {
    id: 9,
    image: "src/assets/background-mudanza.jpg",
    price: 500,
    description: "PH luminoso"
  }
];

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const InmueblesRecientes = () => {

  return (
    <Wrapper>
      <Title>Inmuebles Publicados Recientemente</Title>

      <CarouselContainer>
        <Carousel responsive={responsive}>
          {inmuebles.map(inmueble => {
            const { id, image, price, description } = inmueble;

            return (
              <Card key={id} sx={{ maxWidth: 200, height: 280 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="120"
                    image={image}
                    alt="inmueble publicado recientemente"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        ${price}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
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
