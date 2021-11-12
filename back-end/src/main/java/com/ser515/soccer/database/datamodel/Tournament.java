package com.ser515.soccer.database.datamodel;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.List;

@Entity @Table(uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
@Getter @Setter @NoArgsConstructor
public class Tournament {
    public enum Type { U16, U17, U18, U19, U20, U21, U22, U23 }

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String iconSrc;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(length = 1000)
    private String description;

    private int registrationFee;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM d yyyy HH:mm:ss (zzzz)")
    private ZonedDateTime registrationDeadline;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM d yyyy HH:mm:ss (zzzz)")
    private ZonedDateTime startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM d yyyy HH:mm:ss (zzzz)")
    private ZonedDateTime endDate;

    private int ticketPrice;

    @OneToMany
    private List<SoccerMatch> matchList;

    @OneToMany
    private List<Team> teamList;

    private boolean isOnGoing() {
        return (ZonedDateTime.now().compareTo(startDate) >= 0 &&
                ZonedDateTime.now().compareTo(endDate) <= 0);
    }
}
