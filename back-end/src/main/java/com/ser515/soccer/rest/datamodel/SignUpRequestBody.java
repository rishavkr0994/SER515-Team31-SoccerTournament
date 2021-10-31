package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.User;

public class SignUpRequestBody {
    public String firstName;
    public String lastName;
    public String email;
    public String password;
    public User.Role role;

    public SignUpRequestBody() { }
}
