package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.Team;
import com.ser515.soccer.database.datamodel.Tournament;

public class TeamRegistrationRequestBody {
    public String teamName;
    public String tournamentName;
    public Team.Type type;

    public TeamRegistrationRequestBody() { }

    public Team createTeamInstance(Tournament tournament) {
        Team team = new Team();
        team.setName(this.teamName);
        team.setType(this.type);
        team.setTournament(tournament);
        return team;
    }
}
