import { awaitWithInterval } from "../../../utils/awaitWithInterval";
import type { Consts } from "../../../utils/consts";
import { createShowAllButtonsButton } from "./createShowAllButtonsButton";
import { getRecordButtons } from "./getRecordButtoms";
import { getTimecard } from "./getTimecard";
import { parseTodaysTimes } from "./parseTodaysTimes";

const overwriteStyle = () => {
  const styleElement = document.createElement("style");
  styleElement.innerHTML = `
#buttons li {
  display: none;
}

.record-btn-outer {
  background: unset !important;
}
`;

  document.body.append(styleElement);
};

export const handleRecordButtonsVisibility = async (consts: Consts) => {
  const [timecardPage, dateString] = await Promise.all([
    getTimecard(consts),
    awaitWithInterval(() => {
      const dateElement = document.querySelector(".watch-year-to-date");
      if (!(dateElement instanceof HTMLElement)) return;

      const [, dateString] =
        /\d+年(\d+月\d+日)/.exec(dateElement.innerText) ?? [];

      if (dateString) return { data: dateString };
    }),
  ]);
  if (!timecardPage || !dateString) return;

  const times = await parseTodaysTimes({ timecardPage, dateString });
  if (!times) return;

  const recordButtons = await getRecordButtons(consts);
  if (!recordButtons) return;

  if (times.start.length > times.end.length) {
    if (times.startRest.length > times.endRest.length) {
      /**
       * 休憩中
       */
      recordButtons.buttonEndRest.style.display = "inline-block";
    } else {
      /**
       * 休憩中でない
       */
      recordButtons.buttonEnd.style.display = "inline-block";
      recordButtons.buttonStartRest.style.display = "inline-block";
    }
  } else {
    /**
     * 勤務中でない
     */
    recordButtons.buttonStart.style.display = "inline-block";
  }

  createShowAllButtonsButton(recordButtons);
  overwriteStyle();
};
