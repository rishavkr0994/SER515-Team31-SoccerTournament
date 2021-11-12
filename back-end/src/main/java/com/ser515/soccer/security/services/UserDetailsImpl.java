package com.ser515.soccer.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ser515.soccer.database.datamodel.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private final String username;
    @JsonIgnore private final String password;
    private final Collection<? extends GrantedAuthority> authorities;

    private final String firstName;
    private final String lastName;
    private final String eMailAddress;
    private final User.Role role;

    public UserDetailsImpl(String username, String password, Collection<? extends GrantedAuthority> authorities,
                           String firstName, String lastName, String eMailAddress, User.Role role) {
        this.username = username;
        this.password = password;
        this.authorities = authorities;
        this.firstName = firstName;
        this.lastName = lastName;
        this.eMailAddress = eMailAddress;
        this.role = role;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
        return new UserDetailsImpl(user.getEmailAddress(), user.getPassword(), authorities, user.getFirstName(),
                user.getLastName(), user.getEmailAddress(), user.getRole());
    }

    @Override public String getUsername() { return username; }
    @Override public String getPassword() { return password; }
    @Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEMailAddress() { return eMailAddress; }
    public User.Role getRole() { return role; }

    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }

    @Override
    public boolean equals(Object o) {
        if (this == o)  return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(username, user.username);
    }
}
