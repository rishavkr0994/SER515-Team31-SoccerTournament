package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.Tournament;

import java.time.ZonedDateTime;

public class TournamentRegistrationBody {
    public String name;
    public String iconSrc;
    public Tournament.Type type;
    public String description;

    public int registrationFee;
    public ZonedDateTime registrationDeadline;

    public ZonedDateTime startDate;
    public ZonedDateTime endDate;

    public int ticketPrice;

    public TournamentRegistrationBody() { }

    public Tournament createTournamentInstance() {
        Tournament tournament = new Tournament();
        tournament.setName(this.name);
        tournament.setIconSrc(this.iconSrc);
        tournament.setType(this.type);
        tournament.setDescription(this.description);

        tournament.setRegistrationFee(this.registrationFee);
        tournament.setRegistrationDeadline(this.registrationDeadline);

        tournament.setStartDate(this.startDate);
        tournament.setEndDate(this.endDate);

        tournament.setTicketPrice(this.ticketPrice);

        return tournament;
    }
}
