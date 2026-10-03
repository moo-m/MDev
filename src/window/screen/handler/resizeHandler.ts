import { rectU } from "../utils/rectUtils.js";
export class ResizeHandler {
  public static resize(winEle: HTMLDivElement) {
    const resize: HTMLDivElement = document.createElement("div");
    resize.classList.add("dev-window-resize");
    resize.addEventListener(
      "touchstart",
      (e) => {
        e.stopPropagation();
        e.preventDefault();
      },
      { passive: false },
    );
    resize.addEventListener(
      "touchmove",
      (e) => {
        e.stopPropagation();
        e.preventDefault();
        const rect = rectU(winEle);

        winEle.style.width = `${e.touches[0].clientX - rect.left}px`;
        winEle.style.height = `${e.touches[0].clientY - rect.top}px`;
      },
      { passive: false },
    );
    resize.addEventListener(
      "touchend",
      (e) => {
        e.stopPropagation();
        const rect = rectU(winEle);

        winEle.style.setProperty("--dev-width", `${rect.width}px`);
        winEle.style.setProperty("--dev-height", `${rect.height}px`);
      },
      { passive: true },
    );
    winEle.appendChild(resize);
  }
}
