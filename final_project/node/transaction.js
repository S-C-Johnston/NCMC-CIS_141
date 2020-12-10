/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const DEBUG = true;

const CURRENCY = require('currency.js');
if (DEBUG && CURRENCY)
{
	console.log('Loaded currency.js successfully');
}

class Transaction
{
	constructor(
		source_account,
		destination_account,
		amount,
		memo,
		type
	)
	{
		if (arguments.length != 5)
		{
			throw new Error("required arguments empty!");
		}


		this.ID = Transaction.#unique_ID();


		this.source_account = source_account;
		this.destination_account = destination_account;
		this.amount = new CURRENCY(amount);
		this.memo = memo;
		this.type = type;

		if (DEBUG)
		{
			console.log(`Highest ID, which should match ID: ${Transaction.#HIGHEST_ID}`);
			console.log("This transaction is:")
			console.log(this);
		}
	}

	static #HIGHEST_ID = 0;
	static #unique_ID()
	{
		if (DEBUG)
		{
			console.log(`Highest ID before increment: ${Transaction.#HIGHEST_ID}`);
		}

		return ++Transaction.#HIGHEST_ID;
	}
}


/**
 * Transaction class:
 * - Transaction ID
 *   + static method
 * - Source account by ID
 *   + Pending or confirmed?
 * - Destination account by ID
 *   + Pending or confirmed?
 * - Amount
 * - Memo
 * - Type
 * - Timestamp
 */

module.exports = Transaction;
