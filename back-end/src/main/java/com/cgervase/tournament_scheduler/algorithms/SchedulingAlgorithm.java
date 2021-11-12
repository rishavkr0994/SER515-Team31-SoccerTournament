// Created by: Rishav Kumar <rkumar96@asu.edu>
// For incorporating strategy design pattern to select the tournament scheduling algorithm at runtime

package com.cgervase.tournament_scheduler.algorithms;

import com.cgervase.tournament_scheduler.Match;
import com.cgervase.tournament_scheduler.Player;

import java.util.LinkedList;

public interface SchedulingAlgorithm {
    LinkedList<Match> generateFixtures(LinkedList<Player> playerList);
}
