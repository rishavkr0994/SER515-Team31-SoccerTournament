package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Table(uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
@Getter @Setter @NoArgsConstructor
public class SoccerField {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;

    private float latitude;
    private float longitude;
}
