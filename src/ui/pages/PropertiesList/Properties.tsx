
import styled from "styled-components";
import { useAppSelector } from "../../../store/hooks";
import { selectIsPropertiesError, selectLoadingProperties, selectProperties } from "../../../store/properties/propertiesSlice";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import Alert from "@mui/material/Alert";
import { formatNumberToCurrency, isMobileMediaQuery } from "../../../helpers";
import { PropertyCard } from "../../components/PropertyCard";
import { useMediaQuery } from "@mui/material";

const PropertiesWrapper = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;
`;

const Properties = () => {
  const properties = useAppSelector(selectProperties);
  const loadingProperties = useAppSelector(selectLoadingProperties);
  const isPropertiesError = useAppSelector(selectIsPropertiesError);

  const isMobile = useMediaQuery(isMobileMediaQuery);

  if (loadingProperties) {
    return (
      <LoadingSkeleton />
    );
  }

  if (isPropertiesError) {
    return (
      <Alert severity="error">
          Ocurrió un error al mostrar los inmuebles.
      </Alert>
    );
  }

  return (
    <PropertiesWrapper>
      {
        properties.map(property => {
          const { id, images, price, district, rooms, surface_total, beds, bathrooms, type } = property;
          const image = images[0];
          const formattedPrice = formatNumberToCurrency({
            number: price
          });

          return (
            <PropertyCard
              key={id}
              orientation={isMobile ? "horizontal" : "vertical"}
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
        })
      }
    </PropertiesWrapper>
  );
};

export default Properties;
