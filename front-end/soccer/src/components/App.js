// App.js
import React from 'react';
//import {useLoadScript} from "@react-google-maps/api";
import SideBar from './sidebar';
import './App.css';
import Map from './components/Map';


function App() {

  return (
    <div id = "App">
      <Sidebar />
    <div className="main-wrapper">
      <Map />
    </div>
	</div>
  );
}

export default App;
