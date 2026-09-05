import { awaitWithInterval } from "../../utils/awaitWithInterval";

export const redirectTimecardLink = async () => {
	const searchParams = new URLSearchParams(window.location.search);
	if (searchParams.has("timecard")) {
		const timeCardListItem = await awaitWithInterval(() => {
			const element = Array.from(document.querySelectorAll("#menu_icon .menu-item a")).find(
				(element) => element instanceof HTMLElement && element.innerText.includes("タイムカード"),
			);
			if (element) return { data: element };
		});

		await new Promise((res) => globalThis.setTimeout(res, 200));

		if (timeCardListItem instanceof HTMLElement) timeCardListItem.click();
	}
};
