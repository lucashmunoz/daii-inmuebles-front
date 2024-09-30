import { useEffect, useRef, useState } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import ReactDOM from "react-dom";
import { PropertyPopup } from "./PropertyPopup";
import { useAppSelector } from "../../store/hooks";
import { selectIsPropertiesError, selectLoadingProperties, selectProperties } from "../../store/properties/propertiesSlice";

const CABA_CENTER_LAT = -34.6144806;
const CABA_CENTER_LNG = -58.4464348;

export interface Bouds {
  latNorthEast: number
  lngNorthEast: number
  latSouthWest: number
  lngSouthWest: number
}

interface PropertiesMapProps {
  onMapBoundsChange: (bounds: Bouds) => void
}

const PropertiesMap = ({ onMapBoundsChange }: PropertiesMapProps) => {
  const properties = useAppSelector(selectProperties);
  const loadingProperties = useAppSelector(selectLoadingProperties);
  const isPropertiesError = useAppSelector(selectIsPropertiesError);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState<{
    centerLat: number
    centerLng: number
  }>({
    centerLat: CABA_CENTER_LAT,
    centerLng: CABA_CENTER_LNG
  });

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    nonce: "google-map-loader"
  });

  const handleMapChange = (map: google.maps.Map) => {
    const bounds = map.getBounds();
    if (bounds) {
      const latNorthEast = bounds.getNorthEast().lat();
      const lngNorthEast = bounds.getNorthEast().lng();
      const latSouthWest = bounds.getSouthWest().lat();
      const lngSouthWest = bounds.getSouthWest().lng();

      setCenter({
        centerLat: map.getCenter()?.lat() || CABA_CENTER_LAT,
        centerLng: map.getCenter()?.lng() || CABA_CENTER_LNG
      });

      setZoom(map.getZoom() || 12);

      onMapBoundsChange({
        latNorthEast,
        lngNorthEast,
        latSouthWest,
        lngSouthWest
      });
    }

    // Enviar las coords al backend para obtener las propiedades
  };

  useEffect(() => {
    if (!isPropertiesError && !loadingProperties && isLoaded && mapRef.current) {
      const map = new google.maps.Map(mapRef.current!, {
        center: {
          lat: center.centerLat,
          lng: center.centerLng
        },
        zoom: zoom,
        mapId: import.meta.env.VITE_MAP_ID,
        disableDefaultUI: true
      });

      // Escuchar el evento 'idle' para obtener los límites del mapa
      map.addListener("idle", () => handleMapChange(map));

      properties.forEach(property => {
        const marker = new google.maps.Marker({
          map,
          position: {
            lat: property.latitude,
            lng: property.longitude
          },
          title: property.title
        });

        marker.addListener("click", () => {
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }

          const infoWindow = new google.maps.InfoWindow({
            position: {
              lat: property.latitude,
              lng: property.longitude
            }
          });

          const infoWindowDiv = document.createElement("div");

          const { id, images, title, price, district } = property;
          const image = images[0];

          ReactDOM.render(
            <PropertyPopup
              id={id}
              image={image}
              title={title}
              price={price}
              district={district}
            />,
            infoWindowDiv
          );

          infoWindow.setContent(infoWindowDiv);
          infoWindow.open(map);
          google.maps.event.clearListeners(map, "idle");
          infoWindowRef.current = infoWindow;

          infoWindow.addListener("closeclick", () => {
            map.addListener("idle", () => handleMapChange(map));
          });
        });
      });
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, loadingProperties, isPropertiesError]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px"
      }}
    />
  );
};

export default PropertiesMap;
