export class CloseHandler {
  public static close(winEle: HTMLDivElement, name: string) {
    const close: HTMLDivElement = document.createElement("div");
    close.classList.add("dev-window-close-btn");
    close.textContent = "×";
    close.addEventListener("click", () => {
      winEle.classList.add("dev-window-close");
      //@ts-expect-error
      window.MDev?.screens[name]?.activate = false;
      winEle.addEventListener(
        "animationend",
        () => {
          winEle.remove();
        },
        { once: true },
      );
    });
    winEle.appendChild(close);
  }
}
