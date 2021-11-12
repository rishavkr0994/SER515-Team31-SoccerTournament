package com.ser515.soccer.rest;

import com.ser515.soccer.database.repository.TeamRepository;
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

    public TeamAPI(TeamRepository teamRepository, TournamentRepository tournamentRepository) {
        this.teamRepository = teamRepository;
    }

    @Operation(description = "Register a team with team information")
    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TeamRegistrationRequestBody requestBody) {
        if (teamRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The name is already used"));

        teamRepository.save(requestBody.getTeamInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
