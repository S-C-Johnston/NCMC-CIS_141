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

class Account
{
	#owning_user_ID;
	#account_ID;
	#name;
	#balance;
	#pending_balance;
	#transactions;
	#type;

	constructor(
		owning_user_ID,
		name,
		type,
		balance,
	)
	{
		if (arguments.length < 4)
		{
			throw new Error("Required arguments missing!");
		}

		if (isNaN(owning_user_ID))
		{
			throw new TypeError("Owning user ID must be numeric");
		}
		else
		{
			this.#owning_user_ID = owning_user_ID;
		}

		this.#name = name.toString();
		this.#type = type;
		this.#balance = new CURRENCY(balance);
		this.#account_ID = Account.#unique_ID();
		this.#transactions = new Map();
	}

	get owning_user_ID()
	{
		return this.#owning_user_ID;
	}
	
	get account_ID()
	{
		return this.#account_ID;
	}

	get name()
	{
		return this.#name;
	}

	get balance()
	{
		return this.#balance;
	}

	get pending_balance()
	{
		return this.#pending_balance;
	}

	get type()
	{
		return this.#type;
	}

	initiate_withdrawal({transaction_ID, amount})
	{
		amount = new CURRENCY(amount);

		if (amount > this.#balance || amount > this.#pending_balance)
		{
			throw new RangeError(`Amount ${amount} for transaction ${transaction_ID} greater than account ${this.#account_ID} balance ${this.#balance} or the pending balance ${this.#pending_balance}. No overdrafts allowed`);
		}
		else
		{
			this.#adjust_pending_balance(amount, true);
			this.#push_transaction({transaction_ID, amount, is_pending: true});

			//this.#transactions.set(transaction_ID, [
			//	["amount", amount],
			//	["pending_balance", this.#pending_balance],
			//	["pending", true],
			//]);

			return true;
		}
	}

	#push_transaction({transaction_ID, amount, is_pending})
	{
		this.#transactions.set(transaction_ID, [
			["amount", amount],
			["pending_balance", this.#pending_balance],
			["pending", is_pending],
		]);
	}

	#adjust_pending_balance(amount, is_debit)
	{
		if (!(amount instanceof CURRENCY))
		{
			throw new TypeError("amount argument must be of type currency");
		}

		if (undefined == this.#pending_balance)
		{
			this.#pending_balance = this.#balance;
		}

		if (is_debit)
		{
			if (this.#pending_balance == this.#balance)
			{
				return this.#pending_balance = this.#balance - amount;
			}
			else
			{
				return this.#pending_balance -= amount;
			}
		}
		else
		{
			if ( this.#pending_balance == this.#balance)
			{
				return this.#pending_balance = this.#balance + amount;
			}
			else
			{
				return this.#pending_balance += amount;
			}
		}
	}

	confirm_withdrawal({transaction_ID})
	{
		if (this.#transactions.has(transaction_ID))
		{
			if (this.#transactions.get(transaction_ID).get("pending") == true)
			{
				this.#transactions.get(transaction_ID).set("pending", false);
				this.#balance -=
					this.#transactions.get(transaction_ID).get("amount");
				
				return true;
			}
			else
			{
				throw new Error(`Transaction with ID ${transaction_ID} no longer pending for account ${this.#account_ID}!`);
			}
		}
		else
		{
			throw new Error(`No transaction with ID ${transaction_ID} found for account ${this.#account_ID}!`);
		}
	}

	deposit({transaction_ID, amount})
	{
		amount = new CURRENCY(amount);

		this.#adjust_pending_balance(amount);
		this.#transactions.set(transaction_ID);
		return this.#balance += amount;
	}

	static #HIGHEST_ID = 0;
	static #unique_ID()
	{
		if (DEBUG)
		{
			console.log(`Highest account_ID before increment: ${Account.#HIGHEST_ID}`);
		}

		return ++Account.#HIGHEST_ID;
	}

}

/** Account class:
 * - Account ID
 *   + static method
 * - Name
 * - Type
 * - Balance
 * - Pending balance
 * - Array of confirmed transaction stubs w/ foreign key and calculated value
 *   at timestamp
 *   + Array: ``[transaction_id, calculated balance]``
 * - Array of pending transaction stubs
 */

module.exports = Account;
