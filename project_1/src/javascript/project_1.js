/**
 * @name River Falls Construction calculator
 * @file Calculates lot price for River Falls Construction
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version 2020.10.26.01
 */

'use strict';

const rlsync = require('readline-sync');

const DEBUG = false;
const DEFAULT_RETURN = 'Default return';
//should a calling function have a default value, use that

const BASE_PRICE = 50000;
const BEDROOM_PRICE = 17000;
const BATHROOM_PRICE = 12500;
const GARAGE_PRICE_PER_CAR = 6000;

function main()
{
	let lots = get_lots();

	do
	{
		let current_lot = new Map([
			['lot_num',
				( Math.max(...lots.map(lot => lot.get('lot_num'))) +1 )],
			['num_bedrooms',],
			['num_bathrooms',],
			['garage_capacity',],
		]);


		current_lot.set('num_bedrooms', prompt_bedrooms());
		current_lot.set('num_bathrooms', prompt_bathrooms());
		current_lot.set('garage_capacity', prompt_garage());

		let lot_price = calc_lot_price(Object.fromEntries(current_lot));
		if (DEBUG) console.log(`!! lot_price: ${lot_price}`);

		current_lot.set('lot_price', lot_price);

		lots.push(current_lot);
	} while( true == prompt_continue('Process another lot? [Y]es or [N]'));

	print_lots(lots);
}

function print_lots(lots)
{
	if (lots.length <= 1)
	{
		return new Error('Lots array has too few lots in it!');
	}
	for (const lot of lots)
	{
		if (lot.get('lot_num') == 0)
		{
			continue;
		}

		console.log(`lot number: ${lot.get('lot_num')}, price: \
${lot.get('lot_price')}`);
	}
}

function get_lots()
{
	return [new Map([['lot_num', 0]])];
}

function prompt_bedrooms()
{
	let bedroom_message = `Choose the number of bedrooms you'd like. The \
price is ${BEDROOM_PRICE}, and this will default to 1: `;
	let result = prompt_int_in_range(bedroom_message, 1, 0);

	if (DEBUG) console.log(`!! bedrooms: ${result}, isNaN?: ${isNaN(result)}`);

	if (DEBUG) console.log(`!! Default return triple-eq result: \
${DEFAULT_RETURN === result}`);

	if (DEFAULT_RETURN === result)
	{
		return 1;
	}

	return result;
}

function prompt_bathrooms()
{
	let bathroom_message = `Choose the number of bathrooms you'd like. The \
price is ${BATHROOM_PRICE}, and this will default to 1: `;
	let result = prompt_int_in_range(bathroom_message, 1, 0);

	if (DEBUG) console.log(`!! bathrooms: ${result}, isNaN?: ${isNaN(result)}`);

	if (DEBUG) console.log(`!! Default return triple-eq result: \
${DEFAULT_RETURN === result}`);
	if (DEFAULT_RETURN === result)
	{
		return 1;
	}

	return result;
}

function prompt_garage()
{
	let garage_message = `Choose the capacity of the garage you'd like. The \
price is ${GARAGE_PRICE_PER_CAR}, and this will default to 1: `;
	let result = prompt_int_in_range(garage_message, 1, 0);

	if (DEBUG) console.log(`!! garage_capacity: ${result}, isNaN?: \
${isNaN(result)}`);

	if (DEBUG) console.log(`!! Default return triple-eq result: \
${DEFAULT_RETURN === result}`);
	if (DEFAULT_RETURN === result)
	{
		return 1;
	}

	return result;
}


function calc_lot_price({num_bedrooms, num_bathrooms, garage_capacity})
{
	let lot_price = BASE_PRICE;
	if(DEBUG) console.log(`lot_price: ${lot_price}`);

	if (DEBUG)
	{
		console.log(`!! num_bedrooms: ${num_bedrooms}, \
isNaN?: ${isNaN(num_bedrooms)}`);
		console.log(`!! num_bathrooms: ${num_bathrooms}, \
isNaN?: ${isNaN(num_bathrooms)}`);
		console.log(`!! garage_capacity: ${garage_capacity}, \
isNaN?: ${isNaN(garage_capacity)}`);
	}

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
	let valid_min_max = validate_num_in_range(min_num, max_num, min_num);
	if (DEBUG)
	{
		console.log(`!! min_num: ${min_num}, \
max_num: ${max_num}, \
valid_min_max: ${valid_min_max}`);
	}
	if (valid_min_max instanceof Error) return valid_min_max;

	let limit_message = `Input a number between ${min_num} and ${max_num}. \
A maximum of 0 implies no limit.`;

	let result;
	let valid_result = false;
	do
	{
		result = rlsync.questionInt(message_str,
			{limitMessage: limit_message});
		if (DEBUG) console.log(`!! result: ${result}`);

		valid_result = validate_num_in_range(min_num, max_num, result);
		if (DEBUG) console.log(`!! valid_result: ${valid_result}`);

		if (valid_result instanceof Error || true != valid_result) 
		{ 
			console.log(limit_message);
			//shouldn't reach this for an error, because rlsync.questionInt
			//checks for valid integers
			if (prompt_continue('Choose a new number [y], or use default ' +
				'[any other key]?') == false)
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
