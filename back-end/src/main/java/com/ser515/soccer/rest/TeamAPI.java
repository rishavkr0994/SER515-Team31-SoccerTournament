package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.Team;
import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.TeamRepository;
import com.ser515.soccer.database.repository.TournamentRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TeamRegistrationRequestBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController @RequestMapping("/rest/team")
public class TeamAPI {
    final TeamRepository teamRepository;
    final TournamentRepository tournamentRepository;

    public TeamAPI(TeamRepository teamRepository, TournamentRepository tournamentRepository) {
        this.teamRepository = teamRepository;
        this.tournamentRepository = tournamentRepository;
    }

    @Operation(description = "Register a team with team information")
    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TeamRegistrationRequestBody requestBody) {
        Tournament tournament = tournamentRepository.findByName(requestBody.tournamentName).orElse(null);
        if (tournament == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The tournament name is not valid"));

        Team team = teamRepository.findByName(requestBody.teamName).orElse(null);
        if (team != null && team.getTournament().getId() == tournament.getId())
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The team name cannot be used"));
        team = requestBody.getTeamInstance(tournament);
        teamRepository.save(team);

        tournament.getTeamList().add(team);
        tournamentRepository.save(tournament);
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
