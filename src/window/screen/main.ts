import { SCREENT } from "../../types/window/main";
import { MoveHandler } from "./handler/moveHandler.js";
import { ResizeHandler } from "./handler/resizeHandler.js";
import { CloseHandler } from "./handler/closeHandler.js";

export default class Screen {
  constructor(
    private name: string,
    private layout: HTMLDivElement,
    private position: SCREENT.winPosition,
  ) {
    this.init();
  }
  public init() {
    const winEle: HTMLDivElement = document.createElement("div");
    winEle.id = `dev-screen-${this.name}`;

    const { top, left, width, height } = this.position;
    winEle.style.top = `${top}px`;
    winEle.style.left = `${left}px`;
    winEle.style.width = `${width}px`;
    winEle.style.height = `${height}px`;
    //handler/moveHandler.js
    MoveHandler.move(winEle);
    //handler/resizeHandler.js
    ResizeHandler.resize(winEle);
    //handler/closeHandler.js
    CloseHandler.close(winEle, this.name);
    winEle.appendChild(this.layout);
    window.MDev.host!.appendChild(winEle);
  }
}
