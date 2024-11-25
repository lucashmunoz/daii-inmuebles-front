import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { PropertyType } from "../../../models/property";
import { getPropertyTypeNameByType } from "../../../helpers";
import styled from "styled-components";
import { Button } from "@mui/material";
import { modules } from "../../../navigation/paths";

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

const MovingActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

interface PropertyCardProps {
  orientation: "vertical" | "horizontal"
  id: string | number
  district: string
  propertyId: number
  image: string
  price: string
  type: PropertyType
  currentStatus: string
  isFurnitureMoveStatus?: boolean
  handleMoveSelection: () => void
}

const ContractCard = ({ orientation, district, image, price, type, handleMoveSelection, currentStatus, propertyId, isFurnitureMoveStatus = false }: PropertyCardProps) => {
  const propertyType = getPropertyTypeNameByType(type).toUpperCase();

  const isHorizontal = orientation === "horizontal";

  if(isHorizontal) {
    return (
      <Card
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

              <div>
                <Typography variant="body1" sx={{
                  fontWeight: "bold"
                }}>
                  {currentStatus}
                </Typography>

                {isFurnitureMoveStatus && (
                  <MovingActions>
                    <Typography variant="body1" sx={{
                      fontWeight: "bold"
                    }}>
                    ¿Almacenar muebles?
                    </Typography>

                    <Button
                      onClick={() => {
                        window.location.replace(`${modules.logisticaCargarMudanza}?propertyId=${propertyId}`);
                        handleMoveSelection();
                      }}
                      variant="contained"
                    >Si</Button>
                    <Button variant="contained" onClick={handleMoveSelection}>No</Button>
                  </MovingActions>
                )}

              </div>

            </CardDetailsContainer>
          </CardContent>
        </DesktopCardContentWrapper>
      </Card>
    );
  }

  return (
    <Card
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
              fontWeight: "bold"
            }}>
              {currentStatus}
            </Typography>
            {isFurnitureMoveStatus && (
              <MovingActions>
                <Typography variant="body1" sx={{
                  fontWeight: "bold"
                }}>
                    ¿Almacenar muebles?
                </Typography>

                <div>
                  <Button
                    onClick={() => {
                      window.location.replace(`${modules.logisticaCargarMudanza}?propertyId=${propertyId}`);
                      handleMoveSelection();
                    }}
                    variant="contained"
                  >Si</Button>
                  <Button variant="contained" onClick={handleMoveSelection}>No</Button>
                </div>
              </MovingActions>
            )}

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
