import { FormatManager } from "../main.js";
import { separateHandler } from "./handler/separate.js";
export class ObjectF {
	public format(obj: any): HTMLDivElement {
		const container = document.createElement("div");
		container.classList.add("dev-console-object");
		const header: HTMLDivElement = document.createElement("div");
		header.classList.add("dev-console-object-header");
		const title: HTMLDivElement = document.createElement("div");
		title.classList.add("dev-console-object-title");
		title.textContent = `Object(${Object.keys(obj).length})`;

		const separate: HTMLDivElement = document.createElement("div");
		separate.classList.add("dev-console-separate-nunPrimitives");
		separate.textContent = "->";
		separate.addEventListener("click", () => {
			separateHandler(container);
		});
		header.append(title, separate);

		const leftBracket: HTMLDivElement = document.createElement("div");
		leftBracket.textContent = "{";
		leftBracket.classList.add("dev-console-object-brecket");

		container.append(header, leftBracket);
		for (const key in obj) {
			const itemContainer: HTMLDivElement = document.createElement("div");
			itemContainer.classList.add("dev-console-object-items-container");
			const objKey: HTMLDivElement = document.createElement("div");
			objKey.classList.add("dev-console-object-key");
			objKey.textContent = `${key} :`;
			itemContainer.append(objKey, FormatManager.start(obj[key]));
			container.append(itemContainer);
		}
		const rightBracket: HTMLDivElement = document.createElement("div");
		rightBracket.textContent = "}";
		rightBracket.classList.add("dev-console-object-brecket");
		container.append(rightBracket);
		return container;
	}
}
