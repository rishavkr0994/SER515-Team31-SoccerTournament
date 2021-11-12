// Source code by: Charles Gervase (CGervase) https://github.com/CGervase/Tournament-Scheduler
// Modified by: Rishav Kumar <rkumar96@asu.edu>

package com.cgervase.tournament_scheduler;

import java.util.ArrayList;

// a participant in the tournament
public class Player implements Comparable<Player> {
	private final String tag; // string identifier for the player
	private int win = 0;	  // number of wins
	private int loss = 0;	  // number of losses
	private int seed;		  // seed for proper placement in bracket
	private int place = 1;	  /* final placement in elimination tournament. it is updated after the player is knocked
							   * out or after tournament ends */
	public ArrayList<Player> history = new ArrayList<>(); // list of already played opponents (used in swiss format)

	// constructor for an unseeded player
	public Player(String tag) {
		this.tag = tag;
	}

	// constructor for a seeded player
	public Player(String tag, int seed) {
		this.tag = tag;
		this.seed = seed;
	}

	public String getTag() {
		return tag;
	}

	public int getSeed() {
		return seed;
	}
	public void setSeed(int seed) {
		this.seed = seed;
	}
	
	public int getWin() {
		return win;
	}
	public void addWin() {
		win++;
	}
	
	public int getLoss() {
		return loss;
	}
	public void addLoss() {
		loss++;
	}
	
	public int getPlace() {
		return place;
	}
	public void setPlace(int place) {
		this.place = place;
	}

	// used for sorting player by seed
	@Override
	public int compareTo(Player p) {
		return Integer.compare(this.seed, p.seed);
	}
	
	public String toString() {		//returns player's tag
		return tag;
	}
}
