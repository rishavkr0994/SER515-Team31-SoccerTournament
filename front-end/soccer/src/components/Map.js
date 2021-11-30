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
    name: "A-003, Phoenix Sports Centre",
    position: { lat: 33.45609, lng: -111.98953 },
  },
  {
    id: 4,
    name: "A-004, Desert West Sports Complex",
    position: { lat: 33.3717, lng: -112.21181 },
  },
  {
    id: 5,
    name: "A-005, Deer Valley Soccer Fields",
    position: { lat: 33.8717, lng: -112.675335 },
  },
  {
    id: 6,
    name: "A-006, Reach 11 Sports Complex",
    position: { lat: 33.2727, lng: -113.500000 },
  },
  {
    id: 7,
    name: "B-001, Westside Sports Complex",
    position: { lat: 34.3717, lng: -113.437654 },
  },
  {
    id: 8,
    name: "B-002, Desert West Park Mini-Patches",
    position: { lat: 35.3717, lng: -113.098909 },
  },
  {
    id: 9,
    name: "B-003, Benedict Sports Complex",
    position: { lat: 34.5643, lng: -111.549080 },
  },
  {
    id: 10,
    name: "B-004, Legends Elite Soccer",
    position: { lat: 34.3987, lng: -113.876656 },
  },
  {
    id: 11,
    name: "B-005, Hanger Park Soccer Field",
    position: { lat: 34.5000, lng: -112.987634 },
  },
  {
    id: 12,
    name: "B-006, Scottsdale Sports Complex",
    position: { lat: 34.1000, lng: -113.650989 },
  },
  {
    id: 13,
    name: "C-001, Phoenix Rising FC Soccer Complex at Wild Horse Pass",
    position: { lat: 33.8734, lng: -113.654377 },
  },
  {
    id: 14,
    name: "C-002, Stroud Park Soccer Field",
    position: { lat: 33.6534, lng: -114.765432 },
  },
  {
    id: 15,
    name: "C-003, Celaya Park Soccer Field",
    position: { lat: 32.7654, lng: -113.223481 },
  },
  {
    id: 16,
    name: "C-004, GCU Stadium",
    position: { lat: 33.5432, lng: -113.453629 },
  },
  {
    id: 17,
    name: "C-005, Arizona Sand Soccer",
    position: { lat: 33.6521, lng: -113.223481 },
  },
  {
    id: 18,
    name: "C-006, Hollis Park Soccer Field",
    position: { lat: 34.6278, lng: -113.223481 },
  }
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
        }}>FIELD-A-003</a>
        <a onClick={e=>{
          handleActiveMarker(4)
        }}>FIELD-A-004</a>
        <a onClick={e=>{
          handleActiveMarker(5)
        }}>FIELD-A-005</a>
        <a onClick={e=>{
          handleActiveMarker(6)
        }}>FIELD-A-006</a>
        <a onClick={e=>{
          handleActiveMarker(7)
        }}>FIELD-B-001</a>
        <a onClick={e=>{
          handleActiveMarker(8)
        }}>FIELD-B-002</a>
        <a onClick={e=>{
          handleActiveMarker(9)
        }}>FIELD-B-003</a>
        <a onClick={e=>{
          handleActiveMarker(10)
        }}>FIELD-B-004</a>
        <a onClick={e=>{
          handleActiveMarker(11)
        }}>FIELD-B-005</a>
        <a onClick={e=>{
          handleActiveMarker(12)
        }}>FIELD-B-006</a>
        <a onClick={e=>{
          handleActiveMarker(13)
        }}>FIELD-C-001</a>
        <a onClick={e=>{
          handleActiveMarker(14)
        }}>FIELD-C-002</a>
        <a onClick={e=>{
          handleActiveMarker(15)
        }}>FIELD-C-003</a>
        <a onClick={e=>{
          handleActiveMarker(16)
        }}>FIELD-C-004</a>
        <a onClick={e=>{
          handleActiveMarker(17)
        }}>FIELD-C-005</a>
        <a onClick={e=>{
          handleActiveMarker(18)
        }}>FIELD-C-006</a>
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
