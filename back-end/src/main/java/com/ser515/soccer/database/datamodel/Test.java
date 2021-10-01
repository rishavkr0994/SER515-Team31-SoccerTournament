package com.ser515.soccer.database.datamodel;

import javax.persistence.*;

@Entity @Table(name = "test")
public class Test {

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String column01;
    private String column02;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getColumn01() { return column01; }
    public void setColumn01(String column01) { this.column01 = column01; }

    public String getColumn02() { return column02; }
    public void setColumn02(String column02) { this.column02 = column02; }
}
