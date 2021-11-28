import React from 'react';
import { Link } from 'react-router-dom';

export default function Map(){
    const name= "justAName"
        return(
            <div className="Main">
                <Link to={"/tournament/"+name}>A link</Link>
            </div>
        )
}