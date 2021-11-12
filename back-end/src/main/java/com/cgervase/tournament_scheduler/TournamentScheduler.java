// Created by: Rishav Kumar <rkumar96@asu.edu>
// For incorporating strategy design pattern to select the tournament scheduling algorithm at runtime

package com.cgervase.tournament_scheduler;

import com.cgervase.tournament_scheduler.algorithms.SchedulingAlgorithm;

import java.util.Collections;
import java.util.LinkedList;

public class TournamentScheduler {
    private LinkedList<Player> playerList;
    private final SchedulingAlgorithm schedulingAlgorithm;

    public TournamentScheduler(LinkedList<Player> playerList, SchedulingAlgorithm schedulingAlgorithm) {
        this.playerList = playerList;
        Collections.sort(this.playerList); // sort player list by seed value
        this.schedulingAlgorithm = schedulingAlgorithm;
    }

    public LinkedList<Match> generateFixtures() {
        return schedulingAlgorithm.generateFixtures(playerList);
    }
}
