import React from 'react';
import { useLoadScript } from "@react-google-maps/api";
import Map from "./Map";
export default function NewMap() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBCMB_ZQOlQThgFrxXib-MuzQbZ1a71ZvU" // Add your API key
      });
      return isLoaded ? <Map></Map> : null
}
