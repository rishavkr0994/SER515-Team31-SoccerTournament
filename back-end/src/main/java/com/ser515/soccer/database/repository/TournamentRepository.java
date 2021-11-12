package com.ser515.soccer.database.repository;

import com.ser515.soccer.database.datamodel.Tournament;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.Optional;

@Repository
public interface TournamentRepository extends PagingAndSortingRepository<Tournament,Long> {
    Optional<Tournament> findByName(String name);
    Boolean existsByName(String name);
    Page<Tournament> findByRegistrationDeadlineGreaterThanEqual(ZonedDateTime registrationDeadline, Pageable pageable);
}
