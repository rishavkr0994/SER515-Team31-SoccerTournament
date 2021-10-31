package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity @Getter @Setter @NoArgsConstructor @Table
public class SoccerField {
    @Id     @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private float latitude;
    private float longitude;
    private String name;
    private String place;

}
