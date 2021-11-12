package com.ser515.soccer.database.datamodel;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;

@Entity @Table(uniqueConstraints = { @UniqueConstraint(columnNames = "name") })
@Getter @Setter @NoArgsConstructor
public class SoccerField {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String name;

    @Column(precision = 17, scale = 15)
    private BigDecimal latitude;
    @Column(precision = 18, scale = 15)
    private BigDecimal longitude;

    private int seatingCapacity;
}
