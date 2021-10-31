package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.SoccerMatch;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoccerMatchRepository extends JpaRepository<SoccerMatch, Long> {
}
