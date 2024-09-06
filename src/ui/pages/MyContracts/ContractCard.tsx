import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PropertyContractStatus, PropertyType } from "../../../models/property";
import { getContractStatusNameByType, getPropertyTypeNameByType } from "../../../helpers";
import styled from "styled-components";

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
`;

interface PropertyCardProps {
  orientation: "vertical" | "horizontal"
  id: string | number
  district: string
  image: string
  price: string
  type: PropertyType
  currentState: PropertyContractStatus
}

const ContractCard = ({ orientation, id, district, image, price, type, currentState }: PropertyCardProps) => {
  const propertyType = getPropertyTypeNameByType(type).toUpperCase();
  const propertyStatus = getContractStatusNameByType(currentState).toUpperCase();

  const isHorizontal = orientation === "horizontal";

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
        <DesktopCardContentWrapper>
          <CardMedia
            component="img"
            height="100%"
            sx={{
              width: 280
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
                  {propertyType} ALQUILADO
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

              <Typography variant="body1" sx={{
                fontWeight: "bold",
                color: currentState === "AL_DIA" ? "blue" : "red"
              }}>
                {propertyStatus}
              </Typography>
            </CardDetailsContainer>
          </CardContent>
        </DesktopCardContentWrapper>
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
      <CardActionArea>
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
            <Typography variant="body1" sx={{
              fontWeight: "bold",
              color: currentState === "AL_DIA" ? "blue" : "red"
            }}>
              {propertyStatus}
            </Typography>
            <Typography variant="body2" sx={{
              color: "text.secondary"
            }}>
              {district}
            </Typography>
          </CardDataRow>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ContractCard;
