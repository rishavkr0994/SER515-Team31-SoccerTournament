
import { Button } from '@mui/material';
import React from 'react';
import './FooterAndMain.css'

export default function AllTournament(){
    return(
        <div className="Main">
            <Button variant="contained" href="/tournament/create">
              Add Tournament
            </Button>
        </div>
    );
}