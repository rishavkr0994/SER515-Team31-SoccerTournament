package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class SoccerMatch {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne @JoinColumn(name = "team_1_id")
    private Team team1;

    @ManyToOne @JoinColumn(name = "team_2_id")
    private Team team2;

    private LocalDateTime time;

    @ManyToOne @JoinColumn(name = "field_id")
    private SoccerField field;
}