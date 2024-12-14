export const createShowAllButtonsButton = ({
  buttonStart,
  buttonEnd,
  buttonStartRest,
  buttonEndRest,
}: {
  buttonStart: HTMLElement;
  buttonEnd: HTMLElement;
  buttonStartRest: HTMLElement;
  buttonEndRest: HTMLElement;
}) => {
  const showAllButton = document.createElement("button");
  showAllButton.innerText = "全ボタンを表示";
  showAllButton.style.backgroundColor = "#A8A499";
  showAllButton.style.color = "white";
  showAllButton.style.padding = ".5em 1em";
  showAllButton.style.border = "none";
  showAllButton.style.borderRadius = "4px";

  showAllButton.addEventListener("click", () => {
    for (const button of [
      buttonStart,
      buttonEnd,
      buttonStartRest,
      buttonEndRest,
    ]) {
      button.style.display = "inline-block";
    }
  });

  const buttonsContainerElement =
    document.getElementById("buttons")?.parentElement;
  if (!(buttonsContainerElement instanceof HTMLElement)) return;

  buttonsContainerElement.appendChild(showAllButton);
};
