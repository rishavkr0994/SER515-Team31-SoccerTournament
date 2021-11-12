// Source code by: Charles Gervase (CGervase) https://github.com/CGervase/Tournament-Scheduler
// Modified by: Rishav Kumar <rkumar96@asu.edu>

package com.cgervase.tournament_scheduler;

// a match played between two players
public class Match {
	private final Player p1; // = new Player("bye", Integer.MAX_VALUE); for debugging
	private final Player p2; // = new Player("bye", Integer.MAX_VALUE); for debugging
	private Player winner; // winner of the match
	private Player loser;  // loser of the match
	
	public Match(Player p1, Player p2) { // a match is played between two players p1 and p2
		this.p1 = p1;
		this.p2 = p2;
	}

	// returns winner of the match
	public Player setResults(int p) {
		if (p1.getTag().equals("bye")) // if p1 is a bye, then p2 is automatically the winner
			p = 0;
		else if (p2.getTag().equals("bye"))	// if p2 is a bye, then p1 is automatically the winner
			p = 1;

		if (p > 0) { // p1 wins
			winner = p1;
			p1.addWin();
			loser = p2;
			p2.addLoss();
		} else { // p2 wins
			winner = p2;
			p2.addWin();
			loser = p1;
			p1.addLoss();
		}
		return winner; // return winner of the match
	}

	public Player getWinner() {
		return winner;
	}
	public Player getLoser() {
		return loser;
	}

	public String toString() {
		return p1 + "(" + p1.getSeed() + ")" + " vs. " + p2 + "(" + p2.getSeed() + ")";	// ex. Fox McCloud(1) vs. Kirby(26)
	}
}
