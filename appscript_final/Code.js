const debug = true;

function main() {
	const delay_days = 14 // Enter # of days before messages are moved to trash
	const oldest_date = new Date();
	oldest_date.setDate(-delay_days);
	console.log("Oldest date is: %s", oldest_date);

	console.log(`debug is ${debug}`);

	const label_regexp = /delete me.*/gi;
	const label_names = match_label(label_regexp);

	const sender_table = new Map(); // Key: sender email, Value: {count: number of messages from that sender} 
	const summary_message_body = [];

	cleanUp(label_names, oldest_date, summary_message_body, sender_table);

	const top_senders = get_top_senders(sender_table, 5);

	prepare_final_summary(summary_message_body, sender_table);
	send_summary_email(summary_message_body);

	console.log("Summary message body:\n%s", summary_message_body);
}

function cleanUp(label_names, oldest_date, summary_message_body, sender_table) {
	label_names.forEach(named_label => {
		const label = GmailApp.getUserLabelByName(named_label);
		console.log(`Found ${label.getThreads().length} threads`);
		const threads = label.getThreads();
		console.log("Handling '%s' label", label.getName());
		threads.forEach(thread => {
			if (thread.getLastMessageDate() < oldest_date) {
				let offending_thread = {};
				offending_thread.subject = thread.getFirstMessageSubject();
				offending_thread.from = thread.getMessages()[0].getFrom();
				offending_thread.date = thread.getLastMessageDate();
				const found_thread_string = `Subject < ${offending_thread.subject} > from sender < ${offending_thread.from} > on date ${offending_thread.date}\n`;
				summary_message_body.push(found_thread_string);

				console.log(found_thread_string);

				if (sender_table.has(String(offending_thread.from))) {
					sender_table.set(String(offending_thread.from)), { count: sender_table.get(String(offending_thread)) + 1 };
				} else {
					sender_table.set(String(offending_thread.from), { count: 1 });
				}

				if (!debug) {
					thread.moveToTrash();
				}
				else {
					console.log("Debugging enabled, no trashing")
				}
			}
		});
	});
}

function match_label(re) {
	var results = [];
	var names = [];
	var labels = GmailApp.getUserLabels();
	labels.forEach(label => {
		names.push(label.getName());
	})
	names.forEach(name => {
		if (name.match(re)) {
			console.log("label: %s added", name);
			results.push(name);
		};
	});
	return results;
}

function get_top_senders(sender_table, top_n) {
	var sorted_senders = Array.from(sender_table.entries()).sort((a, b) => b[1].count - a[1].count);
	return sorted_senders.slice(0, top_n);
}

function prepare_final_summary(summary_message_body, sender_table) {
	summary_message_body.push("\n\nTop senders:\n");
	const top_senders = get_top_senders(sender_table, 5);
	top_senders.forEach(sender_entry => {
		summary_message_body.push(`Sender: ${sender_entry[0]}, Count: ${sender_entry[1].count}\n`);
	});
	return summary_message_body;
}

function send_summary_email(summary_message_body) {
	const user_email = Session.getActiveUser().getEmail();
	if (!debug) {
		GmailApp.sendEmail(user_email, "Gmail Cleanup Summary", summary_message_body);
	} else {
		GmailApp.sendEmail(user_email, "Gmail Cleanup Summary (Debug Mode)", summary_message_body);
	}
}

main();
