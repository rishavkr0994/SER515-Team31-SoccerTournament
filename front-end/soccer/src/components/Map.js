import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { Stack, Grid } from '@mui/material';
import '../App.css'

const markers = [
  {
    id: 1,
    name: "A-001, Peco Park Field",
    position: { lat: 33.26888, lng: -111.52462 },
  },
  {
    id: 2,
    name: "A-002, Rose Mofford Sports Complex",
    position: { lat: 33.403709, lng: -111.972229 },
  },
  {
    id: 3,
    name: "B-001, Phoenix Sports Centre",
    position: { lat: 33.45609, lng: -111.98953 },
  },
  {
    id: 4,
    name: "B-002, Desert West Sports Complex",
    position: { lat: 33.3717, lng: -112.21181 },
  },
  {
    id: 5,
    name: "B-002, ewrwerwer",
    position: { lat: 34.3717, lng: -112.223481 },
  },
];

function Map() {
  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={1}>
        <Stack spacing={2} textAlign="center" className="MapBar">
        <a onClick={e=>{
          handleActiveMarker(1)
        }}>FIELD-A-001</a>
        <a onClick={e=>{
          handleActiveMarker(2)
        }}>FIELD-A-002</a>
        <a onClick={e=>{
          handleActiveMarker(3)
        }}>FIELD-B-001</a>
        <a onClick={e=>{
          handleActiveMarker(4)
        }}>FIELD-B-002</a>
      </Stack>
        </Grid>
        <Grid item xs={11}>
        <GoogleMap
        onLoad={handleOnLoad}
        onClick={() => setActiveMarker(null)}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
      >
        {markers.map(({ id, name, position }) => (
          <Marker
            key={id}
            position={position}
            onClick={() => handleActiveMarker(id)}
          >
            {activeMarker === id ? (
              <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <div>{name}</div>
              </InfoWindow>
            ) : null}
          </Marker>
        ))}
      </GoogleMap>
        </Grid>
      </Grid>


    </div>
  );
}

export default Map;
