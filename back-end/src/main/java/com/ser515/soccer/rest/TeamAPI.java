package com.ser515.soccer.rest;

import com.ser515.soccer.database.repository.TeamRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TeamRegistrationRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController @RequestMapping("/rest/team")
public class TeamAPI {
    @Autowired TeamRepository teamRepository;

    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TeamRegistrationRequestBody requestBody) {
        if (teamRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The name is already used"));

        teamRepository.save(requestBody.getTeamInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
