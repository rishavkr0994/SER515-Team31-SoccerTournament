package com.ser515.soccer.rest.datamodel;

import javax.validation.constraints.Email;

public class BookTicketRequestBody {
    @Email public String emailAddress;
    public int ticketCount;
}
