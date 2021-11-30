import React from "react";
import './Tournaments.css'

export default function Tournaments(){
        return(
            <div className="Main">
                <h1 className="h1Color">Tournament Rules</h1>
                <h2 className="h2Color">RULES OF COMPETITION</h2>
                <h3>Rule 1: AGE AND ELIGIBILITY</h3>
                <p>
                    The competition is open to accepted teams composed of eighteen (18) or fewer players, meeting the age limit of the specified division. Players must have been born during, or subsequent to the divisional year. Each team must be registered with a National Soccer Association and with a league affiliated with the USYS or national equivalent and present a valid state roster. Player registration cards, duly authorized by state or national associations will be required as proof of age. Out of state teams must have a copy of the permission to travel form, approved and signed by a USYS representative. Teams shall consist of eighteen or less players in the U13 through U19 division, sixteen players in the U11-U12, and fourteen players in the U10 and under divisions, meeting the age limit of the listed divisions.
                </p>
                <h3>Rule 2: LAWS OF THE GAME</h3>
                <p>All games shall be played in accordance with the FIFA Laws except as specifically modified by these rules.</p>
                <h3>Rule 3: TOURNAMENT FORMAT</h3>
                <ul>
                    <li>Teams will be flighted according to competition level in brackets of three - four teams, depending on number of registered teams. There will be multiple flights in all divisions as space allows.</li>
                    <li>If a team is not ready to play 10 minutes after the scheduled start time, it will forfeit the game.</li>
                    <li>Failure to register at least 1 hour prior to the first scheduled game time on the day of competition may also result in forfeiture of all of your games.</li>
                    <li>All games will play 25 minute halves, with a 5-minute break between halves.  Halftime may be shortened if the schedule is running behind.</li>
                </ul>
                <h2 className="h2Color">Rules for Advancement:</h2>
                <p>Teams will be awarded points on the following basis:<br/>
                Six (6) points for each Win<br/>
Three (3) points for each Tie<br/>
Zero (0) points for each Loss<br/>
One (1) point for each goal scored up to a max of six (6) per game.  Losing teams receive points also.<br/>
One (1) point for each shutout</p>
            </div>
        )
}