package com.ser515.soccer.rest.datamodel;

import com.ser515.soccer.database.datamodel.Role;

public class SignUpRequestBody {
    public Role.UserRole role;
    public String firstName;
    public String lastName;
    public String email;
    public String password;

    public SignUpRequestBody() { }
}
