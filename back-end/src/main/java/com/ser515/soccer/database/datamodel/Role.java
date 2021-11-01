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
    private UserRole fullname;
    private UserRole email;
    private UserRole phno;


    public Role(UserRole name) { this.name = name;
    }
    public void Rolerole(UserRole role) { this.role = role;
    }
    public void Rolefname(UserRole fullname) { this.role = fullname;
    }
    public void Rolefemail(UserRole email) { this.role = email;
    }
    public void Rolephno(UserRole phno) { this.phno = phno;
    }
}
