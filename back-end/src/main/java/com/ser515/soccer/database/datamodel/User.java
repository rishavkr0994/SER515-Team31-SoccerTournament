package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(uniqueConstraints = { @UniqueConstraint(columnNames = "emailAddress") })
@NoArgsConstructor @Getter @Setter
public class User {
    public enum Role {
        TOURNAMENT_DIRECTOR,
        TEAM_DIRECTOR,
        REFEREE_DIRECTOR,
        FIELD_DIRECTOR,
        VOLUNTEER_DIRECTOR,
        SYSTEM
    }

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String firstName;
    private String lastName;
    private String password;
    private String emailAddress;

    @Enumerated(EnumType.STRING)
    private Role role;
}
