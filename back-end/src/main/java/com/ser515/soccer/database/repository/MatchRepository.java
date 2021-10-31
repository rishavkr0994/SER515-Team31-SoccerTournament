package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.Match;

import com.ser515.soccer.database.datamodel.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MatchRepository extends JpaRepository<Match, Long> {
    Optional<Match> findByName(Team team1 );
}
