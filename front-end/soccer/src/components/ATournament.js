import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";
import './FooterAndMain.css'

export default function ATournament(){
    let{id}= useParams()
    return(
        <div className="Main">
            <h>ID={id}</h>
        </div>
    )
}