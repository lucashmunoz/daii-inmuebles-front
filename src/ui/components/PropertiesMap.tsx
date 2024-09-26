import { useEffect, useRef } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import ReactDOM from "react-dom";
import { PropertyPopup } from "./PropertyPopup";
import { useAppSelector } from "../../store/hooks";
import { selectIsPropertiesError, selectLoadingProperties, selectProperties } from "../../store/properties/propertiesSlice";

const CABA_CENTER_LAT = -34.6144806;
const CABA_CENTER_LNG = -58.4464348;

const PropertiesMap = () => {
  const properties = useAppSelector(selectProperties);
  const loadingProperties = useAppSelector(selectLoadingProperties);
  const isPropertiesError = useAppSelector(selectIsPropertiesError);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    version: "beta",
    libraries: ["places"]
  });

  useEffect(() => {
    if (!isPropertiesError && !loadingProperties && isLoaded && mapRef.current) {
      const map = new google.maps.Map(mapRef.current!, {
        center: {
          lat: CABA_CENTER_LAT,
          lng: CABA_CENTER_LNG
        },
        zoom: 12,
        mapId: import.meta.env.VITE_MAP_ID
      });

      // Escuchar el evento 'idle' para obtener los límites del mapa
      map.addListener("idle", () => {
        const bounds = map.getBounds();
        if (bounds) {
          const latNorthEast = bounds.getNorthEast().lat();
          const lngNorthEast = bounds.getNorthEast().lng();
          const latSouthWest = bounds.getSouthWest().lat();
          const lngSouthWest = bounds.getSouthWest().lng();

          console.log("latNorthEast", latNorthEast);
          console.log("lngNorthEast", lngNorthEast);
          console.log("latSouthWest", latSouthWest);
          console.log("lngSouthWest", lngSouthWest);
        }

        // Enviar las coords al backend para obtener las propiedades
      });

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
              location={district}
            />,
            infoWindowDiv
          );

          infoWindow.setContent(infoWindowDiv);
          infoWindow.open(map);
          infoWindowRef.current = infoWindow;
        });
      });
    }
  }, [isLoaded, properties, loadingProperties, isPropertiesError]);

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
