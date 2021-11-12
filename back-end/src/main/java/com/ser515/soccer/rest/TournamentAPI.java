package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.TournamentRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TournamentRegistrationBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController @RequestMapping("/rest/tournament")
public class TournamentAPI {
    final TournamentRepository tournamentRepository;

    public TournamentAPI(TournamentRepository tournamentRepository,
                         ImageHostingServiceInterface imageHostingServiceInterface) {
        this.tournamentRepository = tournamentRepository;
    }

    // TODO: Convert Response Body To Paged Response Body For Handling Large Tournament Lists With The General Get API
    @Operation(description = "Get list of all the tournaments or a tournament by name")
    @GetMapping(value = {"", "/{name}"})
    public ResponseEntity<Object> get(@PathVariable(required = false) String name) {
        if (name == null) {
            List<Tournament> tournamentList = tournamentRepository.findAll();
            return ResponseEntity.ok().body(APIResponseBody.success(tournamentList));
        } else {
            Tournament tournament = tournamentRepository.findByName(name).orElse(null);
            if (tournament == null)
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseBody.failure(
                        "The tournament name is not valid"));
            else return ResponseEntity.ok().body(APIResponseBody.success(tournament));
        }
    }

    @Operation(description = "Register a tournament with tournament information")
    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TournamentRegistrationBody requestBody) {
        if (tournamentRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The name is already used"));

        try {
            requestBody.iconSrc = imageHostingServiceInterface.uploadImage(requestBody.iconSrc);
        } catch (Exception e) { requestBody.iconSrc = null; }

        tournamentRepository.save(requestBody.getTournamentInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
