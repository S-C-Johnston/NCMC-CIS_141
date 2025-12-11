function cleanUp() {
	var debug = false;
	var delayDays = 10 // Enter # of days before messages are moved to trash
	var maxDate = new Date();
	maxDate.setDate(maxDate.getDate() - delayDays);
	Logger.log("Maximum date is: %s", maxDate);

	const label_regexp = /delete me.*/gi;
	var label_names = match_label(label_regexp);

	for (var i = 0; i < label_names.length; i++) {
		var label = GmailApp.getUserLabelByName(label_names[i]);
		var threads = label.getThreads();
		Logger.log("Handling %s label", label);
		for (var j = 0; j < threads.length; j++) {
			if (threads[j].getLastMessageDate() < maxDate) {
				Logger.log(
					"Deleting message with subject %s and date %s",
					threads[j].getFirstMessageSubject(),
					threads[j].getLastMessageDate()
				);
				if (!debug) {
					threads[j].moveToTrash();
				}
				else {
					Logger.log("Debugging enabled, no deletion")
				}
			}
		}
	}
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
			Logger.log("label: %s added", names[i]);
			results.push(names[i]);
		};
	}
	return results;
}
