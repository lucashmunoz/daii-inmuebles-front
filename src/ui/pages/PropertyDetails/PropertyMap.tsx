import { ReactElement, useEffect, useRef } from "react";
import styled from "styled-components";
import PlaceIcon from "@mui/icons-material/Place";
import Divider from "@mui/material/Divider";
import { useJsApiLoader } from "@react-google-maps/api";

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px; 
  gap: 12px;
  background-color: #fff;
`;

const Title = styled.h2`
    font-size: 25px;
    font-weight: normal;
    color: #000;
`;

const Direction = styled.div`
  font-size: 18px;
  color: #000;
  display: flex;
  gap: 8px;
  align-items: center;
`;

interface PropertyMapProps {
  address: string;
  district: string;
  latitude: number;
  longitude: number;
}

const PropertyMap = ({ address, district, latitude, longitude }:PropertyMapProps): ReactElement => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  const center = {
    centerLat: latitude,
    centerLng: longitude
  };

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    nonce: "google-map-loader"
  });

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      async function loadMap() {
        const map = new google.maps.Map(mapRef.current!, {
          center: {
            lat: center.centerLat,
            lng: center.centerLng
          },
          zoom: 16,
          mapId: import.meta.env.VITE_MAP_ID,
          disableDefaultUI: true,
          gestureHandling: "none",
          scrollwheel: false
        });

        // Crear el marcador avanzado
        new google.maps.Marker({
          map,
          position: {
            lat: latitude,
            lng: longitude
          }
        });
      }

      loadMap();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return(
    <ContentContainer>
      <Divider/>
      <Title> Ubicación </Title>

      <Direction>
        <PlaceIcon/>
        <p>{address}, {district}, Cdad. Autónoma de Buenos Aires</p>
      </Direction>
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "400px"
        }}
      />
    </ContentContainer>
  );
};

export default PropertyMap;
