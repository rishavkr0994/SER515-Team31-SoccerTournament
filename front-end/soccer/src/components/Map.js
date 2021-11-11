import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const markers = [
  {
    id: 1,
    name: "Chicago, Illinois",
    position: { lat: 41.881832, lng: -87.623177 }
  },
  {
    id: 2,
    name: "Denver, Colorado",
    position: { lat: 39.739235, lng: -104.99025 }
  },
  {
    id: 3,
    name: "Los Angeles, California",
    position: { lat: 34.052235, lng: -118.243683 }
  },
  {
    id: 4,
    name: "New York, New York",
    position: { lat: 40.712776, lng: -74.005974 }
  }
];
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 34.048928,
      lng: -111.093731
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBCMB_ZQOlQThgFrxXib-MuzQbZ1a71ZvU"}}
          defaultCenter={{lat: 34.048928, lng: -111.093731}}
          defaultZoom={10}
        >
        {markers.map(({id,name,position})=>(

        <Marker key= {1}
          position={{lat: 34.048928, lng: -111.093731}} 
      >
      <Marker key= {2}
          position={{lat: 35.048928, lng: -112.093731}} 
      /><Marker key= {3}
          position={{lat: 36.048928, lng: -113.093731}} 
      /><Marker key= {4}
          position={{lat: 37.048928, lng: -114.093731}} 
      />
        </Marker>
          
         ))}
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;