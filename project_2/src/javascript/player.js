/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

export default class Player {

	constructor(name) {
		#this.score = 0;
		#this.name = name;
		#this.initiative = 0;
	}
}

//player object
//- has a score
//- method to modify score, accepts integers or "reset"
//- method to return score
//- has a name; method to set and get
//- has an initiative value for turn order
