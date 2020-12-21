/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const DEBUG = true;

const CURRENCY = require("currency.js");
if (DEBUG && CURRENCY)
{
	console.log("Loaded currency.js successfully");
}

class Transaction
{
	#transaction_ID;
	#source_account;
	#source_confirmed;
	#destination_account;
	#destination_confirmed;
	#amount;
	#memo;
	#type;

	constructor(
		source_account,
		destination_account,
		amount,
		memo,
		type
	)
	{
		if (arguments.length < 5)
		{
			throw new Error("Required arguments are empty!");
		}

		this.#transaction_ID = Transaction.#unique_ID();

		this.#source_account = source_account;
		this.#destination_account = destination_account;
		this.#amount = new CURRENCY(amount);
		this.#memo = memo.toString();
		this.#type = type;

		if (DEBUG)
		{
			console.log(`Highest transaction_ID, which should match ID: ${Transaction.#HIGHEST_ID}`);
			console.log("This transaction is:");
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

	get transaction_ID()
	{
		return this.#transaction_ID;
	}

	get source_account()
	{
		return this.#source_account;
	}

	set source_confirmed(okay)
	{
		if (undefined == okay)
		{
			throw new TypeError("Argument to source_confirmed() must be defined!");
		}

		okay ? this.#source_confirmed = true :
			this.#source_confirmed = false;
	}

	get source_confirmed()
	{
		if (undefined == this.#source_confirmed)
		{
			return false;
		}
		else
		{
			return this.#source_confirmed;
		}
	}

	get destination_account()
	{
		return this.#destination_account;
	}

	set destination_confirmed(okay)
	{
		if (undefined == okay)
		{
			throw new TypeError("Argument to destination_confirmed() must be defined!");
		}

		okay ? this.#destination_confirmed = true :
			this.#destination_confirmed = false;
	}

	get destination_confirmed()
	{
		if (undefined == this.#destination_confirmed)
		{
			return false;
		}
		else
		{
			return this.#destination_confirmed;
		}
	}

	get amount()
	{
		return this.#amount;
	}

	get memo()
	{
		return this.#memo;
	}

	get type()
	{
		return this.#type;
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
