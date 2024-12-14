import { awaitWithInterval } from "../../utils/awaitWithInterval";

export const setRoleToButtons = async () => {
  const menuButton = document.getElementById("menu_icon");
  if (menuButton) menuButton.role = "button";

  const buttons = await awaitWithInterval(() => {
    const buttons = Array.from(
      document.querySelectorAll("#buttons [id^='record_']"),
    );
    if (buttons.length > 0) return { data: buttons };
  });
  if (!buttons) return;

  for (const buttonElement of buttons) {
    buttonElement.role = "button";
  }
};
