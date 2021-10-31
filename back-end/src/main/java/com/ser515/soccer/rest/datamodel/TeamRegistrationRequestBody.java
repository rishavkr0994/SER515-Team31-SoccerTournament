package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.Team;

public class TeamRegistrationRequestBody {
    public String name;
    public Team.Type type;

    public TeamRegistrationRequestBody() { }

    public Team getTeamInstance() {
        Team team = new Team();
        team.setName(this.name);
        team.setType(this.type);
        return team;
    }
}
