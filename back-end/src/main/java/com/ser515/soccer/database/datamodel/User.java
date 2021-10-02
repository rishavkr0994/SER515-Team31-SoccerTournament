package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "emailAddress"),
        @UniqueConstraint(columnNames = "phoneNo")
})
@NoArgsConstructor @Getter @Setter
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String password;
    private String emailAddress;
    private String phoneNo;
    private Role.UserRole role;
}
