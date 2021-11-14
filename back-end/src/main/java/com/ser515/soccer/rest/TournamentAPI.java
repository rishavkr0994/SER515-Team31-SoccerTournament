package com.ser515.soccer.rest;

import com.ser515.soccer.ImageHostingServiceInterface;
import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.TournamentRepository;
import com.ser515.soccer.rest.datamodel.APIResponseBody;
import com.ser515.soccer.rest.datamodel.PagedAPIResponseBody;
import com.ser515.soccer.rest.datamodel.TournamentRegistrationBody;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController @RequestMapping("/rest/tournament")
public class TournamentAPI {
    final TournamentRepository tournamentRepository;
    final ImageHostingServiceInterface imageHostingServiceInterface;

    public TournamentAPI(TournamentRepository tournamentRepository,
                         ImageHostingServiceInterface imageHostingServiceInterface) {
        this.tournamentRepository = tournamentRepository;
        this.imageHostingServiceInterface = imageHostingServiceInterface;
    }

    @Operation(description = "Get paginated list of all the tournaments (with optional filters)")
    public ResponseEntity<Object> get(@RequestParam(required = false, value = "page", defaultValue = "0") Integer page,
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
                                      @RequestParam(required = false, value = "size", defaultValue = "10") Integer size,
                                      @RequestParam(required = false, value = "filterUpcoming", defaultValue = "False")
                                                  Boolean isFilterUpcoming) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by("registrationDeadline").descending());
        Page<Tournament> tournamentList;
        if (isFilterUpcoming) {
            tournamentList = tournamentRepository.findByRegistrationDeadlineGreaterThanEqual(ZonedDateTime.now(),
                    pageRequest);
        } else tournamentList = tournamentRepository.findAll(pageRequest);

        PagedAPIResponseBody<Tournament> responseBody = new PagedAPIResponseBody<>(tournamentList.getNumber(),
                tournamentList.getSize(), tournamentList.getTotalPages(), tournamentList.getTotalElements(),
                tournamentList.getContent());
        return ResponseEntity.ok().body(responseBody);
    }

    @Operation(description = "Get tournament information by name")
    @GetMapping(value = "/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getByName(@PathVariable String name) {
        Tournament tournament = tournamentRepository.findByName(name).orElse(null);
        if (tournament == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(APIResponseBody.failure(
                    "The tournament name is not valid"));
        else return ResponseEntity.ok().body(APIResponseBody.success(tournament));
    }

    @Operation(description = "Register a tournament with tournament information")
    @PostMapping(value = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> registration(@RequestBody TournamentRegistrationBody requestBody) {
        if (tournamentRepository.existsByName(requestBody.name))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The name is already used"));

        try {
            requestBody.iconSrc = imageHostingServiceInterface.uploadImage(requestBody.iconSrc);
        } catch (Exception e) {
            requestBody.iconSrc = null;
        }

        tournamentRepository.save(requestBody.createTournamentInstance());
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }
}
