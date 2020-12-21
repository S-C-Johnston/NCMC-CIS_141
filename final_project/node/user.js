/**
 * @name ...
 * @file ...
 * @author Stewart Johnston (johnstons1@student.ncmich.edu)
 * @version ...
 */

"use strict";

const DEBUG = true;

class User
{
	#full_name;
	#user_name;
	#user_ID;
	#password;

	constructor(
		full_name,
		user_name,
		password
	)
	{
		this.#full_name = full_name.toString();
		this.#user_name = user_name.toString();
		this.#user_ID = User.#unique_ID();
		this.#password = password.toString();
	}

	static #HIGHEST_ID = 0;
	static #unique_ID()
	{
		if (DEBUG)
		{
			console.log(`Highest user_ID before increment: ${User.#HIGHEST_ID}`);
		}

		return ++User.#HIGHEST_ID;
	}

	get full_name()
	{
		return this.#full_name;
	}

	set full_name(new_full_name)
	{
		this.#full_name = new_full_name.toString();
	}

	get user_name()
	{
		return this.#user_name;
	}

	get user_ID()
	{
		return this.#user_ID;
	}

	get password()
	{
		return this.#password;
	}

	set password(new_password)
	{
		this.#password = new_password;
	}
}

module.exports = User;
