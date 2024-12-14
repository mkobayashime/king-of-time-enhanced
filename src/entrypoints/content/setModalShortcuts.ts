export const setModalShortcuts = () => {
  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      const closeIconButton = document.querySelector("a.close-icon");
      if (closeIconButton instanceof HTMLElement) closeIconButton.click();
    }
  });
};
