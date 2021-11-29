package com.ser515.soccer.rest;

import com.ser515.soccer.TicketMailingService;
import com.ser515.soccer.database.datamodel.SoccerMatch;
import com.ser515.soccer.database.repository.SoccerMatchRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.BookTicketRequestBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.ZonedDateTime;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController
@RequestMapping(value = "/rest/match", produces = MediaType.APPLICATION_JSON_VALUE)
public class SoccerMatchAPI {
    SoccerMatchRepository soccerMatchRepository;
    TicketMailingService ticketMailingService;

    public SoccerMatchAPI(SoccerMatchRepository soccerMatchRepository, TicketMailingService ticketMailingService) {
        this.soccerMatchRepository = soccerMatchRepository;
        this.ticketMailingService = ticketMailingService;
    }

    @Operation(description = "Book ticket for a match with match id")
    @PostMapping(value = "/{id}/bookTicket", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<APIResponseBody> bookTicket(@PathVariable Long id, @Valid @RequestBody BookTicketRequestBody
            requestBody) {
        SoccerMatch soccerMatch = soccerMatchRepository.findById(id).orElse(null);
        if (soccerMatch == null)
            return ResponseEntity.ok().body(APIResponseBody.failure("The match id is not valid"));

        if (soccerMatch.getAvailableTicketCount() < requestBody.ticketCount)
            return ResponseEntity.ok().body(APIResponseBody.failure("The no. of tickets are not available / have been" +
                    " sold out for the selected match"));
        else if (soccerMatch.getTime().compareTo(ZonedDateTime.now()) < 0)
            return ResponseEntity.ok().body(APIResponseBody.failure("The ticket booking window for the selected match" +
                    " has been closed"));

        soccerMatch.setAvailableTicketCount(soccerMatch.getAvailableTicketCount() - requestBody.ticketCount);
        soccerMatchRepository.save(soccerMatch);
        ticketMailingService.sendEmail(requestBody.emailAddress, soccerMatch);
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
