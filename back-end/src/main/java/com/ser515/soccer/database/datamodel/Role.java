package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name = "role")
@NoArgsConstructor @Getter @Setter
public class Role {
    public enum UserRole { COACH, PLAYER, REFEREE, TOURNAMENT_DIRECTOR,
        TEAM_COORDINATOR, COACH_MANAGER, REFEREE_MANAGER
    }

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING )
    private UserRole name;
    private UserRole role;

    public Role(UserRole name) { this.name = name;
    }
}
