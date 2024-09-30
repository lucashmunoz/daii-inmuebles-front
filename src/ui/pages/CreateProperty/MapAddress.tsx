import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { Coordinates } from "../../../models/address";
import { noop } from "lodash";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const MAP_ID = import.meta.env.VITE_MAP_ID;

const containerStyle = {
  width: "100%",
  height: "300px"
};

interface MapAddress {
  addressCoordinates: Coordinates
  showMarker: boolean
}

const MapAddress = ({ addressCoordinates, showMarker }: MapAddress) => {
  const { isLoaded } = useJsApiLoader({
    id: "create-property-map",
    googleMapsApiKey: GOOGLE_MAPS_API_KEY
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={addressCoordinates}
      zoom={15}
      onLoad={noop}
      onUnmount={noop}
      options={{
        disableDefaultUI: true,
        draggable: false,
        mapId: MAP_ID
      }}
    >
      {
        showMarker && <MarkerF position={addressCoordinates} onLoad={noop} />
      }
    </GoogleMap>
  ) : <></>;
};

export default MapAddress;
