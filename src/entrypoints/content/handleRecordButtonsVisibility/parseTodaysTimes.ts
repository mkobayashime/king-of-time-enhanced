export const parseTodaysTimes = ({
	timecardPage,
	dateString,
}: { timecardPage: Document; dateString: string }) => {
	const table = Array.from(timecardPage.getElementsByTagName("table")).find(
		(tableElement) => {
			const thElements = Array.from(tableElement.querySelectorAll("thead th"));
			if (thElements.length === 0) return;

			return ["specific_date", "start_end_timerecord", "rest_timerecord"].every(
				(c) => thElements.some((element) => element.classList.contains(c)),
			);
		},
	);
	if (!table) return;

	const todaysRow = Array.from(table.querySelectorAll("tr")).find((tr) => {
		const dateTd = tr.querySelector("[data-ht-sort-index='WORK_DAY']");
		return (
			dateTd instanceof HTMLElement &&
			dateTd.innerText.includes(dateString.replace("月", "/").replace("日", ""))
		);
	});
	if (!todaysRow) return;

	const [timesStart, timesEnd, timesStartRest, timesEndRest] = [
		"START_TIMERECORD",
		"END_TIMERECORD",
		"REST_START_TIMERECORD",
		"REST_END_TIMERECORD",
	].map((s) => {
		const td = todaysRow.querySelector(`[data-ht-sort-index='${s}']`);
		if (td instanceof HTMLElement)
			return td.innerText.split("\n").filter((t) => /\d\d:\d\d/.exec(t));
	});
	if (
		timesStart === undefined ||
		timesEnd === undefined ||
		timesStartRest === undefined ||
		timesEndRest === undefined
	) {
		return;
	}

	return {
		start: timesStart,
		end: timesEnd,
		startRest: timesStartRest,
		endRest: timesEndRest,
	};
};
