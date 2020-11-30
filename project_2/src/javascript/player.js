/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

export default class Player {

	constructor(name) {
		#this.name = name.match(/\w{1,15}/);
		#this.score = 0;
		#this.initiative = 0;
	}

	function set_initiative(integer)
	{
		returne#this.initiative = Math.trunc(integer);
	}

	function get_initiative()
	{
		return #this.initiative;
	}

	function reset()
	{
		reset_initiative();
		reset_score();
		return true;
	}

	function reset_initiative()
	{
		return #this.initiative = 0;
	}

	function reset_score()
	{
		return #this.score = 0;
	}

	function modify_score(integer)
	{
		if (isNaN(integer))
		{
			throw new TypeError("Supplied input not a number!");
		}
		return #this.score += Math.trunc(integer);
	}

	function get_score()
	{
		return #this.score;
	}
}

//player object
//- has a score
//- method to modify score, accepts integers or "reset"
//- method to return score
//- has a name; method to set and get
//- has an initiative value for turn order
