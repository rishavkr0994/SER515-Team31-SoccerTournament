package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity @Getter @Setter @NoArgsConstructor
public class Team {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String name;//need change to enum
    private String type;
}
