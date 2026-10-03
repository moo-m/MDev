import { rectU } from "../utils/rectUtils.js";
import { getDistance } from "../utils/getDistance.js";
export class MoveHandler {
  public static move(winEle: HTMLDivElement) {
    let diffX: number, diffY: number;
    let initialDistance: number = 0;
    let initialRect: any;
    winEle.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length == 2) {
          e.stopPropagation();
          e.preventDefault();
          const rect = rectU(winEle);

          initialRect = rect;
          initialDistance = getDistance(e);

          const midPointY = (e.touches[1].clientY + e.touches[0].clientY) / 2;
          const midPointX = (e.touches[1].clientX + e.touches[0].clientX) / 2;
          diffX = midPointX - rect.left;
          diffY = midPointY - rect.top;
        }
      },
      { passive: false },
    );
    winEle.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length == 2) {
          if (e.cancelable) {
            e.preventDefault();
          }
          e.stopPropagation();

          // const rect = rectU(winEle);

          const midPointY = (e.touches[1].clientY + e.touches[0].clientY) / 2;
          const midPointX = (e.touches[1].clientX + e.touches[0].clientX) / 2;

          const distance = (getDistance(e) - initialDistance) / 2;

          winEle.style.height = `${initialRect.height + distance}px`;
          winEle.style.top = `${midPointY - diffY - distance / 2}px`;
          winEle.style.width = `${initialRect.width + distance}px`;
          winEle.style.left = `${midPointX - diffX - distance / 2}px`;
        }
      },
      { passive: false },
    );
    winEle.addEventListener(
      "touchend",
      () => {
        const rect = rectU(winEle);
        winEle.style.setProperty("--dev-top", `${rect.top}px`);
        winEle.style.setProperty("--dev-left", `${rect.left}px`);
        winEle.style.setProperty("--dev-width", `${rect.width}px`);
        winEle.style.setProperty("--dev-height", `${rect.height}px`);
      },
      { passive: true },
    );
  }
}
