/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const DEBUG = true;

const User = require("./user.js");
const Account = require("./account.js");
const Transaction = require("./transaction.js");

class Bank
{
	#name;
	#pending_transactions = new Array();
	#completed_transactions = new Array();
	#users = new Array();
	#accounts = new Array();

	constructor(name)
	{
		this.#name = name;
		this.setup();
	}

	process_transactions()
	{
		if (DEBUG)
		{
			console.log("Processing transactions");
		}

		if (this.#pending_transactions.length() < 1)
		{
			console.log(`No transactions found to process in pending_transactions array, whose length is ${this.#pending_transactions.length()}`);
			return true;
		}

		let current_transaction = this.#pending_transactions.shift(); //FIFO

		if (current_transaction.source_confirmed &&
			current_transaction.destination_confirmed)
		{
			this.#completed_transactions[current_transaction.transaction_ID] =
				current_transaction;
			return true;
		}

		let is_internal = (this.#accounts[current_transaction.source_account] &&
			this.#accounts[current_transaction.destination_account])
			? true : false;
		if (is_internal)
		{
			if (DEBUG)
			{
				console.log(`is_internal is ${is_internal}`);
				console.log(`current_transaction is ${current_transaction}`);
				console.log(`amount is ${current_transaction.amount}`);
				console.log(`source account is ${current_transaction.source_account}`);
				console.log(`destination account is ${current_transaction.destination_account}`);
			}
			current_transaction.source_confirmed =
				this.#accounts[current_transaction.source_account]
					.confirm_withdrawal(current_transaction);
			current_transaction.destination_confirmed =
				this.#accounts[current_transaction.destination_account]
					.deposit(current_transaction);

			if (DEBUG)
			{
				console.log(`source account confirmation is ${current_transaction.source_confirmed}`);
				console.log(`destination account confirmation is ${current_transaction.destination_confirmed}`);
			}

			if (current_transaction.source_confirmed &&
				current_transaction.destination_confirmed)
			{
				this.#completed_transactions[current_transaction.transaction_ID] =
					current_transaction;
				return true;
			}

		}
		else if ("Deposit" == current_transaction.type)
		{
			current_transaction.source_confirmed = true;	
			current_transaction.destination_confirmed =
				this.#accounts[current_transaction.destination_account]
					.depostit(current_transaction);

			if (current_transaction.source_confirmed &&
				current_transaction.destination_confirmed)
			{
				this.#completed_transactions[current_transaction.transaction_ID] =
					current_transaction;
				return true;
			}
		}
		else
		{
			throw new Error("Non-internal transfers or withdrawals not yet supported");
		}

		if (! current_transaction.source_confirmed &&
			current_transaction.destination_confirmed)
		{
			this.#pending_transactions.unshift(current_transaction);
			return false;
		}
	}

	setup()
	{
		let my_user = new User("Hello Kitty", "hellokitty", "sanrioltd");
		this.#users[my_user.user_ID] = my_user;
		let my_checking_account = new Account(my_user.user_ID, "Checking",
			"Checking", 500);
		this.#accounts[my_checking_account.account_ID] = my_checking_account;
		let my_saving_account = new Account(my_user.user_ID, "Savings",
			"Saving", 20);
		this.#accounts[my_saving_account.account_ID] = my_saving_account;
		let my_transaction = new Transaction(my_checking_account,
			my_saving_account, 50, "Testing facilities", "Transfer");
		this.#pending_transactions[my_transaction.transaction_ID] =
			my_transaction;

		//return [my_user, my_checking_account, my_saving_account,
		//	my_transaction];
	}
}

module.exports = Bank;
