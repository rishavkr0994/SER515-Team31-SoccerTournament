package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.SoccerField;
import com.ser515.soccer.database.datamodel.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface TeamRepostory extends JpaRepository<Team, Long> {
    Optional<Team> findByName(String name );
}
