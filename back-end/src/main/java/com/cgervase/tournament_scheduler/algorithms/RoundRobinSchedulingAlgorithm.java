// Created by: Rishav Kumar <rkumar96@asu.edu>
// Source code for scheduling algorithm by: Charles Gervase (CGervase) https://github.com/CGervase/Tournament-Scheduler
// For incorporating strategy design pattern to select the tournament scheduling algorithm at runtime

package com.cgervase.tournament_scheduler.algorithms;

import com.cgervase.tournament_scheduler.Match;
import com.cgervase.tournament_scheduler.Player;

import java.util.Collections;
import java.util.LinkedList;

public class RoundRobinSchedulingAlgorithm implements SchedulingAlgorithm {
    @Override
    public LinkedList<Match> generateFixtures(LinkedList<Player> playerList) {
        LinkedList<Player> players = new LinkedList<>(playerList);
        int entrants = players.size();

        // if the no. of entrants is odd, increment the no. of entrants and add a dummy player
        if (entrants % 2 != 0) {
            entrants++;
            players.add(new Player("bye", entrants));
        }

        LinkedList<Match> matchList = new LinkedList<>();
        for (int i = 0; i < entrants - 1; i++) {
            for (int j = 0; j < entrants / 2; j++) {
                matchList.add(new Match(players.get(j), players.get(entrants - j - 1)));
            }
            Collections.rotate(players.subList(1, players.size()), 1);
        }
        return matchList;
    }
}
