package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament,Long> {
    Optional<Tournament> findByName(String name );
}
