import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow
} from "@vis.gl/react-google-maps";
import SearchPropertiesCards from "./SearchPropertiesCards";

// Define una interfaz para las propiedades
interface Property {
  id: number;
  price: string;
  location: string;
  lat: number;
  lng: number;
  image: string;
}

const properties: Property[] = [
  {
    id: 1,
    price: "USD 90,000",
    location: "Palermo, Buenos Aires",
    lat: -34.5885,
    lng: -58.4266,
    image: "https://i.ibb.co/PG93T3T/dpt5.jpg"
  },
  {
    id: 2,
    price: "USD 120,000",
    location: "Recoleta, Buenos Aires",
    lat: -34.5889,
    lng: -58.3975,
    image: "https://i.ibb.co/TLqg2Pg/dpt4.jpg"
  },
  {
    id: 3,
    price: "USD 110,000",
    location: "Belgrano, Buenos Aires",
    lat: -34.5614,
    lng: -58.4586,
    image: "https://i.ibb.co/T1mdwSx/dpt3.jpg"
  },
  {
    id: 4,
    price: "USD 150,000",
    location: "San Isidro, Buenos Aires",
    lat: -34.4725,
    lng: -58.5116,
    image: "https://i.ibb.co/v13cvHF/dpt2.jpg"
  },
  {
    id: 5,
    price: "USD 200,000",
    location: "Tigre, Buenos Aires",
    lat: -34.4264,
    lng: -58.5793,
    image: "https://i.ibb.co/WBD1Hv3/dpt1.jpg"
  }
];

function Intro() {
  const [open, setOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
      <div style={{
        display: "flex", height: "90vh", padding: "20px", boxSizing: "border-box" 
      }}>
        <div
          style={{
            width: "30%",
            overflowY: "scroll",
            padding: "10px",
            backgroundColor: "#f0f0f5",
            borderRadius: "12px",
            border: "1px solid #ccc",
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "20px"
          }}
        >
          <h2 style={{
            textAlign: "center",
            fontFamily: "Helvetica, sans-serif",
            fontWeight: "bold",
            fontSize: "1.8em",
            color: "#333",
            padding: "15px",
            backgroundColor: "#eee",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
          }}
          >
              🏠 Departamentos en Venta
          </h2>
          {properties.map((property) => (
            <SearchPropertiesCards
              key={property.id}
              property={property}
              onClick={handleMarkerClick}
            />
          ))}
        </div>

        <div style={{
          width: "65%", position: "relative", marginLeft: "20px", borderRadius: "8px", overflow: "hidden", border: "1px solid #ccc" 
        }}>
          <Map
            zoom={12}
            center={selectedProperty
              ? {
                lat: selectedProperty.lat, lng: selectedProperty.lng 
              }
              : {
                lat: -34.6037, lng: -58.3816 
              }} // Centro en Buenos Aires
            mapId={import.meta.env.VITE_MAP_ID}
            style={{
              height: "100%", width: "100%" 
            }}
          >
            {properties.map((property) => (
              <AdvancedMarker
                key={property.id}
                position={{
                  lat: property.lat, lng: property.lng 
                }}
                onClick={() => handleMarkerClick(property)}
              >
                <Pin
                  background="grey"
                  borderColor="green"
                  glyphColor="purple"
                />
              </AdvancedMarker>
            ))}

            {open && selectedProperty && (
              <InfoWindow
                position={{
                  lat: selectedProperty.lat, lng: selectedProperty.lng 
                }}
                onCloseClick={() => setOpen(false)}
              >
                <p>{selectedProperty.location}</p>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
}

export default Intro;
