package com.ser515.soccer.rest;

import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.TournamentRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.TournamentRegistrationBody;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value="Tournament API", description="Rest APIs For Tournament Management")
@RestController @RequestMapping("/rest/tournament")
public class TournamentAPI {
    @Autowired TournamentRepository tournamentRepository;

    // TODO: Convert Response Body To Paged Response Body For Handling Large Tournament Lists With The General Get API
    @ApiOperation(value = "Get list of all the tournaments or a tournament by name")
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

    @ApiOperation(value = "Register a tournament with tournament information")
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
