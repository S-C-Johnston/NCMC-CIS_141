/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const rlsync = require('readline-sync');

export function validate_num_in_range(
	input,
	min_num,
	max_num = null) //in the event of just a lower bound, recoverable
{
	if (isNaN(input) || isNaN(min_num) || (null != max_num && isNaN(max_num)))
	{
		throw new TypeError('One of the numeric parameters was NaN!');
	}

	if (min_num > max_num)
	{
		throw new RangeError(`supplied max_num ${max_num} less than supplied` +
			`min_num ${min_num}`);
	}

	if (null != max_num)
	{
		return (min_num <= input && input <= max_num);
	}
	else
	{
		return (min_num <= input);
	}
}

export function prompt_continue(message)
{
	return rlsync.keyInYN(message);
}
