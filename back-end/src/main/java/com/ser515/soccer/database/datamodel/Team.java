package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class Team {
    public enum Type { U16, U17, U18, U19, U20, U21, U22, U23 }
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private Type type;

    @ManyToOne @JoinColumn(name = "tournament_id")
    private Tournament tournament;

    /* TODO: Add more details about the team from a team registration request.
        Example: Name of coach, players, etc. */
}
