package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.Tournament;
import java.time.LocalDateTime;

public class TournamentRegistrationBody {
    public String name;
    public String iconSrc;
    public Tournament.Type type;
    public String description;

    public int registrationFee;
    public LocalDateTime registrationDeadline;

    public LocalDateTime startDate;
    public LocalDateTime endDate;

    public TournamentRegistrationBody() { }

    public Tournament getTournamentInstance() {
        Tournament tournament = new Tournament();
        tournament.setName(this.name);
        tournament.setIconSrc(this.iconSrc);
        tournament.setType(this.type);
        tournament.setDescription(this.description);
        tournament.setOnGoing(false);

        tournament.setRegistrationFee(this.registrationFee);
        tournament.setRegistrationDeadline(this.registrationDeadline);

        tournament.setStartDate(this.startDate);
        tournament.setEndDate(this.endDate);

        return tournament;
    }
}
