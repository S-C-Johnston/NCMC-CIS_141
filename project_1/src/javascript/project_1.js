/**
 * @name River Falls Construction calculator
 * @file Calculates lot price for River Falls Construction
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version 2020.10.26.01
 */

const rlsync = require('readline-sync');

const DEBUG = true;
const DEFAULT_RETURN = 'Default return';
//should a calling function have a default value, use that

const BASE_PRICE = 50000;
const BEDROOM_PRICE = 17000;
const BATHROOM_PRICE = 12500;
const GARAGE_PRICE_PER_CAR = 6000;

function main()
{
	let current_lot = new Map([
		['lot_num',],
		['num_bedrooms',],
		['num_bathrooms',],
		['garage_capacity',],
	]);
	calc_lot_price(current_lot);

	prompt_int_in_range();
}

function calc_lot_price({num_bedrooms, num_bathrooms, garage_capacity})
{
	let lot_price = BASE_PRICE;
	if(DEBUG) console.log(`lot_price: ${lot_price}`);

	lot_price += (BEDROOM_PRICE * num_bedrooms);
	if(DEBUG) console.log(`lot_price w/ bedrooms: ${lot_price}`);

	lot_price += (BATHROOM_PRICE * num_bathrooms);
	if(DEBUG) console.log(`lot_price w/ bathrooms: ${lot_price}`);

	lot_price += (GARAGE_PRICE_PER_CAR * garage_capacity);
	if(DEBUG) console.log(`lot_price w/ garage: ${lot_price}`);

	return lot_price;
}

function prompt_int_in_range(message_str, min_num, max_num)
{
	let valid_min_max = validate_num_in_range(min_num, max_num, 0);
	if (DEBUG)
	{
		console.log(`min_num: ${min_num}, max_num: ${max_num}, valid_min_max:
			${valid_min_max}`);
	}
	if (typeof(valid_min_max) == Error) return valid_min_max;

	let limit_message = `Input a number between ${min_num} and ${max_num}. A
	maximum of 0 implies no limit.`;

	let result;
	let valid_result = false;
	do
	{
		result = rlsync.questionInt(message_str,
			{limitMessage: limit_message});
		if (DEBUG) console.log(`result: ${result}`);

		valid_result = validate_num_in_range(min_num, max_num, result);
		if (DEBUG) console.log(`valid_result: ${valid_result}`);

		if (typeof(valid_result) == Error || true != valid_result) 
		{ 
			console.log(limit_message);
			//shouldn't reach this for an error, because rlsync.questionInt
			//checks for valid integers
			if (prompt_continue('Try again? [Y]es or [N]o') != false)
			{
				return DEFAULT_RETURN;
			}
		}
	} while (true != valid_result);

	return result;
}

function prompt_continue(message)
{
	return rlsync.keyInYN(message);
}

function validate_num_in_range(min_num, max_num, input)
{
	if (isNaN(min_num) || isNaN(max_num) || isNaN(input))
	{
		return Error ('One of the numeric parameters was NaN!');
	}

	if (min_num <= input)
	{
		if (0 === max_num) //0 is conventionally "no limit"; likewise here
		{
			return true;
		}

		if (max_num >= input)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}
}

main();
