// Created by: Rishav Kumar <rkumar96@asu.edu>
// Source code for scheduling algorithm by: Charles Gervase (CGervase) https://github.com/CGervase/Tournament-Scheduler
// For incorporating strategy design pattern to select the tournament scheduling algorithm at runtime

package com.cgervase.tournament_scheduler.algorithms;

import com.cgervase.tournament_scheduler.Match;
import com.cgervase.tournament_scheduler.Player;

import java.util.LinkedList;

public class SingleEliminationSchedulingAlgorithm implements SchedulingAlgorithm {
    @Override
    public LinkedList<Match> generateFixtures(LinkedList<Player> playerList) {
        LinkedList<Player> players = new LinkedList<>(playerList);
        int entrants = players.size();

        // check if the no. of entrants is not a power of 2, and add byes to make the no. of entrants a power of 2
        if ((entrants & (entrants - 1)) != 0) {
            int i = 2;
            while (true) {
                if (Math.pow(2, i) > entrants)
                    break;
                else i++;
            }

            // number of byes to add = (the nearest superior power of 2) - (number of entrants)
            int add = (int) Math.pow(2, i) - entrants;
            for (int j = 0; j < add; j++) {
                players.add(new Player("bye", (int) Math.pow(2, i) + 1));
            }
        }

        LinkedList<Match> matchList = new LinkedList<>();
        while (players.size() > 1) {
            while (!players.isEmpty()) {
                matchList.addLast(new Match(players.pollFirst(), players.pollLast()));
            }
        }
        return matchList;
    }
}
