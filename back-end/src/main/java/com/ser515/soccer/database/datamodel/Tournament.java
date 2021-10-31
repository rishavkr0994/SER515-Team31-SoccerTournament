package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity @Getter @Setter @NoArgsConstructor @Table
public class Tournament {
    @Id     @GeneratedValue(strategy = GenerationType.AUTO)
    private  long id;

    private String name;
    private String iconSrc;

    private String description;
    private Date startDate;
    private Date endDate;
    private Date endRegistration;
    @ManyToOne
    @JoinColumn(name = "field_id")
    private SoccerField field;
    @OneToMany
    private List<Match> matchList;
    @OneToMany
    private List<Team> teamList;
    private boolean isOnGoing;
}
