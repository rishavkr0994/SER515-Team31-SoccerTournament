package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.TournamentRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TournamentRegistrationBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController @RequestMapping("/rest/tournament")
public class TournamentAPI {
    @Autowired TournamentRepository tournamentRepository;

    // TODO: Convert Response Body To Paged Response Body For Handling Large Tournament Lists With The General Get API
    @GetMapping(value ={"", "/{name}"})
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

    @PostMapping("/registration")
    public ResponseEntity<Object> registration(@RequestBody TournamentRegistrationBody requestBody) {
        if (tournamentRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure("The name is already used"));

        tournamentRepository.save(requestBody.getTournamentInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
