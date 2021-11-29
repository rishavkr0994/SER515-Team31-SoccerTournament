package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAddress(String email );
    Boolean existsByEmailAddress(String email );
    Boolean existsByPhoneNo(String phoneNo );
    Boolean existsByfirstname(String fname );
    Boolean existsBylastname(String lname );
    Boolean existsByfullname(String fullname );
    Boolean existsByrole(String role );
}
