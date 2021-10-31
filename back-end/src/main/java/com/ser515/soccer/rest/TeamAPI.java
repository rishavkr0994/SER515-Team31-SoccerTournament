package com.ser515.soccer.rest;

import com.ser515.soccer.database.repository.TeamRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TeamRegistrationRequestBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/rest/team")
@Api(value="Team API", description="Rest APIs For Team Management")
public class TeamAPI {
    @Autowired TeamRepository teamRepository;

    @ApiOperation(value = "Register a team with team information")
    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TeamRegistrationRequestBody requestBody) {
        if (teamRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The name is already used"));

        teamRepository.save(requestBody.getTeamInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
