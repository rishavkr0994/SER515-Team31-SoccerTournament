package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament,Long> {
<<<<<<< HEAD
    Optional<Tournament> findByName(String name );
=======
    Optional<Tournament> findByName(String name);
    Boolean existsByName(String name);
>>>>>>> ac141cf9cbfdcd2f19e7dd8c75f9dd9a5f84dced
}
