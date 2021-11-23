package com.ser515.soccer.database.datamodel;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonIgnore
    @ManyToOne @JoinColumn(name = "team_1_id")
    private Team team1;

    @JsonIgnore
    @ManyToOne @JoinColumn(name = "team_2_id")
    private Team team2;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private ZonedDateTime time;

    @JsonIgnore
    @ManyToOne @JoinColumn(name = "field_id")
    private SoccerField field;

    private int aggregateTicketCount;
    private int availableTicketCount;

    @JsonProperty("team1")
    public String getTeam1Name() {
        return team1 != null ? team1.getName() : null;
    }
    @JsonProperty("team2")
    public String getTeam2Name() {
        return team2 != null ? team2.getName() : null;
    }
    @JsonProperty("field")
    public String getFieldName() {
        return field != null ? field.getName() : null;
    }
}
