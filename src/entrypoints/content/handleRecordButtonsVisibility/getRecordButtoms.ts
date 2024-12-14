import { awaitWithInterval } from "../../../utils/awaitWithInterval";
import type { Consts } from "../../../utils/consts";

export const getRecordButtons = async (consts: Consts) => {
  const [buttonStart, buttonEnd, buttonStartRest, buttonEndRest] =
    (await awaitWithInterval(() => {
      const buttonWrapperLiElements = consts.recordButtons.flatMap(({ id }) => {
        const buttonElement = document.getElementById(`record_${id}`);
        if (!buttonElement) return [];

        const parent = buttonElement.parentElement;
        if (parent instanceof HTMLLIElement) return [parent];

        return [];
      });

      if (buttonWrapperLiElements.length === consts.recordButtons.length) {
        return { data: buttonWrapperLiElements };
      }
    })) ?? [];
  if (
    buttonStart === undefined ||
    buttonEnd === undefined ||
    buttonStartRest === undefined ||
    buttonEndRest === undefined
  ) {
    return;
  }

  return {
    buttonStart,
    buttonEnd,
    buttonStartRest,
    buttonEndRest,
  };
};
