package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity @Table(uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
@Getter @Setter @NoArgsConstructor
public class Tournament {
    public enum Type { U16, U17, U18, U19, U20, U21, U22, U23 }

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;
    private String iconSrc;
<<<<<<< HEAD

=======
    private Type type;
>>>>>>> ac141cf9cbfdcd2f19e7dd8c75f9dd9a5f84dced
    private String description;
    private boolean isOnGoing;

    private int registrationFee;
    private LocalDateTime registrationDeadline;

    private LocalDateTime startDate;
    private LocalDateTime endDate;

    @OneToMany
    private List<Match> matchList;

    @OneToMany
    private List<Team> teamList;
}
