package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.UserRole name);
}
