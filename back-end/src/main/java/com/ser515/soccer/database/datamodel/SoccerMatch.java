package com.ser515.soccer.database.datamodel;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity @Table
@Getter @Setter @NoArgsConstructor
public class SoccerMatch {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @ManyToOne @JoinColumn(name = "team_1_id")
    private Team team1;

    @ManyToOne @JoinColumn(name = "team_2_id")
    private Team team2;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "E MMM d yyyy HH:mm:ss (zzzz)")
    private ZonedDateTime time;

    @ManyToOne @JoinColumn(name = "field_id")
    private SoccerField field;
}
