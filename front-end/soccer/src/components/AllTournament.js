
import { Button } from '@mui/material';
import React from 'react';
import './FooterAndMain.css'

export default function AllTournament(){
    return(
        <div className="Main">
            <Button variant="text" href="/tournament/create">
              Add Tournament
            </Button>
        </div>
    );
}