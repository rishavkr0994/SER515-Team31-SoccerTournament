package com.ser515.soccer.rest;

import com.cgervase.tournament_scheduler.Match;
import com.cgervase.tournament_scheduler.Player;
import com.cgervase.tournament_scheduler.TournamentScheduler;
import com.cgervase.tournament_scheduler.algorithms.RoundRobinSchedulingAlgorithm;
import com.ser515.soccer.ImageHostingServiceInterface;
import com.ser515.soccer.database.datamodel.SoccerField;
import com.ser515.soccer.database.datamodel.SoccerMatch;
import com.ser515.soccer.database.datamodel.Team;
import com.ser515.soccer.database.datamodel.Tournament;
import com.ser515.soccer.database.repository.SoccerFieldRepository;
import com.ser515.soccer.database.repository.SoccerMatchRepository;
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

import java.time.Period;
import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

@SecurityRequirement(name = "JWT Based Authentication")
@RestController @RequestMapping("/rest/tournament")
public class TournamentAPI {
    final TournamentRepository tournamentRepository;
    final SoccerMatchRepository soccerMatchRepository;
    final SoccerFieldRepository soccerFieldRepository;
    final ImageHostingServiceInterface imageHostingServiceInterface;

    public TournamentAPI(TournamentRepository tournamentRepository, SoccerMatchRepository soccerMatchRepository,
                         SoccerFieldRepository soccerFieldRepository,
                         ImageHostingServiceInterface imageHostingServiceInterface) {
        this.tournamentRepository = tournamentRepository;
        this.soccerMatchRepository = soccerMatchRepository;
        this.soccerFieldRepository = soccerFieldRepository;
        this.imageHostingServiceInterface = imageHostingServiceInterface;
    }

    @Operation(description = "Get paginated list of all the tournaments (with optional filters)")
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> get(@RequestParam(required = false, value = "page", defaultValue = "1") Integer page,
                                      @RequestParam(required = false, value = "size", defaultValue = "10") Integer size,
                                      @RequestParam(required = false, value = "filterUpcoming", defaultValue = "False")
                                                  Boolean isFilterUpcoming) {
        PageRequest pageRequest = PageRequest.of(page - 1, size, Sort.by("registrationDeadline").descending());
        Page<Tournament> tournamentList;
        if (isFilterUpcoming) {
            tournamentList = tournamentRepository.findByRegistrationDeadlineGreaterThanEqual(ZonedDateTime.now(),
                    pageRequest);
        } else tournamentList = tournamentRepository.findAll(pageRequest);

        PagedAPIResponseBody<Tournament> responseBody = new PagedAPIResponseBody<>(tournamentList.getNumber() + 1,
                tournamentList.getSize(), tournamentList.getTotalPages(), tournamentList.getTotalElements(),
                tournamentList.getContent());
        return ResponseEntity.ok().body(responseBody);
    }

    @Operation(description = "Get tournament information by name")
    @GetMapping(value = "/{name}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getByName(@PathVariable String name) {
        Tournament tournament = tournamentRepository.findByName(name).orElse(null);
        if (tournament == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
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

    @Operation(description = "Generates the match fixtures for a tournament")
    @PostMapping(value = "/{name}/fixtures", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> generateFixtures(@PathVariable String name) {
        Tournament tournament = tournamentRepository.findByName(name).orElse(null);
        if (tournament == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The tournament name is not valid"));

        List<SoccerMatch> deleteMatchList = new ArrayList<>(tournament.getMatchList());
        tournament.getMatchList().clear();
        tournamentRepository.save(tournament);
        soccerMatchRepository.deleteAll(deleteMatchList);

        HashMap<Player, Team> playerTeamHashMap = new HashMap<>();
        LinkedList<Player> playerList = new LinkedList<>();
        for (Team team : tournament.getTeamList()) {
            Player player = new Player(team.getName(), (int) team.getId());
            playerList.add(player);
            playerTeamHashMap.put(player, team);
        }

        TournamentScheduler scheduler = new TournamentScheduler(playerList, new RoundRobinSchedulingAlgorithm());
        for (Match match : scheduler.generateFixtures()) {
            SoccerMatch soccerMatch = new SoccerMatch();
            Player p1 = match.getP1();
            Player p2 = match.getP2();
            if (!(p1.getTag().equals("bye") || p2.getTag().equals("bye"))) {
                soccerMatch.setTeam1(playerTeamHashMap.get(p1));
                soccerMatch.setTeam2(playerTeamHashMap.get(p2));
                tournament.getMatchList().add(soccerMatch);
            }
        }

        int totalMatchCount = tournament.getMatchList().size();
        List<SoccerField> soccerFieldList = soccerFieldRepository.findAll();
        Period tournamentPeriod = Period.between(tournament.getStartDate().toLocalDate(),
                tournament.getEndDate().toLocalDate());

        int matchIdx = 0; int matchFieldCount = soccerFieldList.size();
        int matchDayCount = tournamentPeriod.getDays() + 1; // + 1 to make it inclusive of end day
        for (int day = 1; day <= matchDayCount; day++) {
            int dayMatchCount = totalMatchCount / matchDayCount;
            if (day <= (totalMatchCount % matchDayCount))
                dayMatchCount++;

            for (int field = 1; field <= matchFieldCount; field++){
                int fieldMatchCount = dayMatchCount / matchFieldCount;
                if (field <= (dayMatchCount % matchFieldCount))
                    fieldMatchCount++;

                for (int match = 1; match <= fieldMatchCount; match++) {
                    SoccerMatch soccerMatch = tournament.getMatchList().get(matchIdx++);
                    soccerMatch.setTime(tournament.getStartDate().plusDays(day - 1));
                    soccerMatch.setField(soccerFieldList.get(field - 1));
                    soccerMatch.setAggregateTicketCount(soccerFieldList.get(field - 1).getSeatingCapacity());
                }
            }
        }

        soccerMatchRepository.saveAll(tournament.getMatchList());
        tournamentRepository.save(tournament);
        return ResponseEntity.ok().body(APIResponseBody.success(null));
    }

    @Operation(description = "Gets the match fixtures for a tournament")
    @GetMapping(value = "/{name}/fixtures", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> getFixtures(@PathVariable String name) {
        Tournament tournament = tournamentRepository.findByName(name).orElse(null);
        if (tournament == null)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(APIResponseBody.failure(
                    "The tournament name is not valid"));
        return ResponseEntity.ok().body(APIResponseBody.success(tournament.getMatchList()));
    }
}
