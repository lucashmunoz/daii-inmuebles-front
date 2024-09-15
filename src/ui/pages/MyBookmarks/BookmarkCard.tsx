import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PropertyType } from "../../../models/property";
import { getPropertyTypeNameByType } from "../../../helpers";
import styled from "styled-components";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { paths } from "../../../navigation/paths";

const DesktopCardContentWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const CardDetailsContainer = styled.div`
 height: 100%;
 width: 100%;
 justify-content: space-between;
 align-content: space-between;
 display: flex;
 flex-direction: row;
 padding: 16px;
`;

const PropertyDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const CardDataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const SpinnerContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.span`
  width: 48px;
  height: 48px;
  border: 5px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
  }
`;

const DeleteButton = styled(Button)`
  align-self: center;
`;

interface PropertyCardProps {
  orientation: "vertical" | "horizontal"
  id: number
  district: string
  image: string
  price: string
  type: PropertyType
  onDelete: (id: number) => void
  loading: boolean
}

const BookmarkCard = ({ orientation, id, district, image, price, type, onDelete, loading }: PropertyCardProps) => {
  const propertyType = getPropertyTypeNameByType(type).toUpperCase();

  const isHorizontal = orientation === "horizontal";

  const detailsPageLink = `${paths.properties}/${id}`;

  if(isHorizontal) {
    return (
      <Card
        key={id}
        sx={{
          maxWidth: 1024,
          width: "100%",
          height: 180
        }}
      >
        <CardActionArea component={Link} to={detailsPageLink} sx={{
          width: "100%",
          height: "100%"
        }}>
          <DesktopCardContentWrapper>
            <CardMedia
              component="img"
              height="100%"
              sx={{
                width: 270
              }}
              image={image}
              alt="inmueble publicado recientemente"
            />
            <CardContent sx={{
              width: "100%", height: "100%"
            }}>
              <CardDetailsContainer>
                <PropertyDetails>
                  <Typography variant="body2" sx={{
                    color: "text.secondary", textAlign: "left", paddingBottom: "8px"
                  }}>
                    {propertyType}
                  </Typography>
                  <Typography gutterBottom variant="h4" component="div">
                  ${price}
                  </Typography>
                  <Typography variant="body2" sx={{
                    color: "text.secondary"
                  }}>
                    {district}
                  </Typography>
                </PropertyDetails>

                {
                  loading
                    ? <SpinnerContainer>
                      <Spinner />
                    </SpinnerContainer>
                    : <DeleteButton
                      onMouseDown={e => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        onDelete(id);
                      }}
                    >
                      Eliminar
                    </DeleteButton>
                }

              </CardDetailsContainer>
            </CardContent>
          </DesktopCardContentWrapper>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card
      key={id}
      sx={{
        width: "100%"
      }}
    >
      <CardActionArea component={Link} to={detailsPageLink} sx={{
        width: "100%",
        height: "100%"
      }}>
        <CardMedia
          component="img"
          height="120"
          image={image}
          alt="inmueble publicado recientemente"
        />
        <CardContent sx={{
          height: 160, justifyContent: "space-between", display: "flex", flexDirection: "column", padding: "16px 20px"
        }}>
          <Typography variant="body2" sx={{
            color: "text.secondary", textAlign: "left", paddingBottom: "8px"
          }}>
            {propertyType} ALQUILADO
          </Typography>
          <Typography gutterBottom variant="h4" component="div">
              ${price}
          </Typography>
          <CardDataRow>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {district}
            </Typography>

            {
              loading
                ? <SpinnerContainer>
                  <Spinner />
                </SpinnerContainer>
                : <DeleteButton
                  onMouseDown={e => e.stopPropagation()}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDelete(id);
                  }}
                >
                      Eliminar
                </DeleteButton>
            }
          </CardDataRow>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BookmarkCard;
