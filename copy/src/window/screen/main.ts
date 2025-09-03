import { winPositionT } from "../../types/window/main";
import { DIV } from "../../types/global";
import { MoveHandler } from "./handler/moveHandler.js";
import { ResizeHandler } from "./handler/resizeHandler.js";
import { CloseHandler } from "./handler/closeHandler.js";

export default class Screen {
	constructor(
		private name: string,
		private layout: HTMLDivElement,
		private position: winPositionT
	) {}
	public init() {
		const winEle: DIV = document.createElement("div");
		winEle.id = `dev-window-screen-${this.name}`;
		const { top, left, width, height } = this.position;
		winEle.style.top = `${top}px`;
		winEle.style.left = `${left}px`;
		winEle.style.width = `${width}px`;
		winEle.style.height = `${height}px`;
		//handler/moveHandler.js
		MoveHandler.move(winEle, this.position);
		//handler/resizeHandler.js
		ResizeHandler.resize(winEle, this.position);
		//handler/closeHandler.js
		CloseHandler.close(winEle);
		winEle.appendChild(this.layout);
		document.body.appendChild(winEle);
	}
}
