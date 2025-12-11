const debug = true;

function main() {
	const delay_days = 14 // Enter # of days before messages are moved to trash
	const oldest_date = new Date(Date.now()).setDate(-delay_days);
	console.log("Oldest date is: %s", oldest_date);

	const label_regexp = /delete me.*/gi;
	const label_names = match_label(label_regexp);


	cleanUp(label_names, oldest_date);
}

function cleanUp(label_names, oldest_date) {
	label_names.forEach(named_label => {
		const label = GmailApp.getUserLabelByName(named_label);
		const threads = label.getThreads();
		console.log("Handling '%s' label", label.getName());
		for (var j = 0; j < threads.length; j++) {
			if (threads[j].getLastMessageDate() < maxDate) {
				console.log(
					"Trashing message with subject %s and date %s",
					threads[j].getFirstMessageSubject(),
					threads[j].getLastMessageDate()
				);
				if (!debug) {
					threads[j].moveToTrash();
				}
				else {
					console.log("Debugging enabled, no trashing")
				}
			}
		}
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
	summary_message_body += "\n\nTop senders:\n";
	const top_senders = get_top_senders(sender_table, 5);
	top_senders.forEach(sender_entry => {
		summary_message_body += `Sender: ${sender_entry[0]}, Count: ${sender_entry[1].count}\n`;
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
