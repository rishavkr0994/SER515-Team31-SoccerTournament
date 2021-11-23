package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.SoccerMatch;
import com.ser515.soccer.database.repository.SoccerMatchRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.ZonedDateTime;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController
@RequestMapping("/rest/match")
public class SoccerMatchAPI {
    SoccerMatchRepository soccerMatchRepository;

    public SoccerMatchAPI(SoccerMatchRepository soccerMatchRepository) {
        this.soccerMatchRepository = soccerMatchRepository;
    }

    @Operation(description = "Book ticket for a match with match id")
    @GetMapping(value = "/bookTicket/{id}", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIResponseBody> bookTicket(@PathVariable Long id) {
        SoccerMatch soccerMatch = soccerMatchRepository.findById(id).orElse(null);
        if (soccerMatch == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The match id is not valid"));

        if (soccerMatch.getAvailableTicketCount() == 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The tickets for the selected match have been sold out"));
        else if (soccerMatch.getTime().compareTo(ZonedDateTime.now()) < 0)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The ticket booking window for the selected match has been closed"));

        soccerMatch.setAvailableTicketCount(soccerMatch.getAvailableTicketCount() - 1);
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
