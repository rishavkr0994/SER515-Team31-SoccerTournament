# Tournament-Scheduler

This is a Java-based tool that schedules tournament matches using one of four formats: [round-robin] 
(https://en.wikipedia.org/wiki/Round-robin_tournament), [swiss] (https://en.wikipedia.org/wiki/Swiss-system_tournament), [single elimination]
(https://en.wikipedia.org/wiki/Single-elimination_tournament), and [double elimination] 
(https://en.wikipedia.org/wiki/Double-elimination_tournament). After entering the participants and choosing a tournament format, the 
program displays the matches for the current round. To record the winners for the round of matches, input a 1 or 0 for each match separated
by a space, where 1 indicates the first player winning and 0 indicates the second player winning.

A demo of this program can be found [here] (https://repl.it/ENB5/35).

## Example
Here is an example of a round of a single-elimination tournament being recorded:

    [Armada(1) vs. Leffen(4), Hungrybox(2) vs. Mew2King(3)]
     0 1
    [Leffen(4) vs. Hungrybox(2)]

Round 1: Player 2 of the first match, Leffen, wins against Armada. In the second match, Hungrybox (Player 1) defeats Mew2King. Thus, the
round is recorded as 0 1.
