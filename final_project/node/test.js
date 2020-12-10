/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const DEBUG = true;

const Transaction = require("./transaction.js");

const NUM = 5;

function main()
{
	if (DEBUG)
	{
		console.log("Debug mode enabled");
		console.log(`Transaction is ${Transaction}`);
	}

	let transaction_test = new Array;

	if (DEBUG)
	{
		console.log(`transaction_test is ${transaction_test}`);
	}

	for (let i = 0; i < NUM; i++)
	{
		try
		{
			transaction_test[i] = new Transaction("001", "002", 300, "memo",
				"deposit");
		}
		catch(err)
		{
			console.error(err);
		}
		if (DEBUG)
		{
			console.log(`transaction_test is ${transaction_test[i]}`);
		}
	}
}

main();

