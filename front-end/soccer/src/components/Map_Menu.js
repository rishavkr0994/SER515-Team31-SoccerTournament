import React from 'react';
import SideBar from './sidebar';
import Map from './Map';
import './Map_Menu.css';

export default function Map_Menu(){
        return(
                <div id="Sidebar">
                <SideBar />
                <div id="Map">
		<Map />
                </div>
                </div>
        );
}

