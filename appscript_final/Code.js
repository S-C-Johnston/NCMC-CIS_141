const debug = true;

function main() {
	const delay_days = 14 // Enter # of days before messages are moved to trash
	const oldest_date = new Date(Date.now()).setDate(-delay_days);
	console.log("Oldest date is: %s", oldest_date);

	const label_regexp = /delete me.*/gi;
	var label_names = match_label(label_regexp);


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
	for (var i = 0; i < labels.length; i++) {
		names.push(labels[i].getName());
	}
	for (var i = 0; i < names.length; i++) {
		if (names[i].match(re)) {
			console.log("label: %s added", names[i]);
			results.push(names[i]);
		};
	}
	return results;
}


main();
