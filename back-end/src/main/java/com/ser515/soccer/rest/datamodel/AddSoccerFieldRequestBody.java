package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.SoccerField;

import java.math.BigDecimal;

public class AddSoccerFieldRequestBody {
    public String name;
    public BigDecimal latitude;
    public BigDecimal longitude;
    public int seatingCapacity;

    public AddSoccerFieldRequestBody() { }

    public SoccerField getSoccerFieldInstance() {
        SoccerField soccerField = new SoccerField();
        soccerField.setName(this.name);
        soccerField.setLatitude(this.latitude);
        soccerField.setLongitude(this.longitude);
        soccerField.setSeatingCapacity(this.seatingCapacity);
        return soccerField;
    }
}
