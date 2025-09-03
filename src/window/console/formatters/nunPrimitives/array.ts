import { FormatManager } from "../main.js";
import { separateHandler } from "./handler/separate.js";
export class ArrayF {
  public format(array: any[]): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("dev-console-array");
    const header: HTMLDivElement = document.createElement("div");
    header.classList.add("dev-console-array-header");
    const title: HTMLDivElement = document.createElement("div");
    title.classList.add("dev-console-array-title");
    title.textContent = `Array(${array.length})`;

    const separate: HTMLDivElement = document.createElement("div");
    separate.classList.add("dev-console-separate-nunPrimitives");
    separate.textContent = ">>";

    separate.addEventListener("click", () => {
      separateHandler(container);
    });
    header.append(title, separate);

    const leftBracket: HTMLDivElement = document.createElement("div");
    leftBracket.textContent = " [";
    leftBracket.classList.add("dev-console-array-brecket");

    container.append(header, leftBracket);
    array.forEach((item, index) => {
      const itemContainer: HTMLDivElement = document.createElement("div");
      itemContainer.classList.add("dev-console-array-items-container");
      const arrIndex: HTMLDivElement = document.createElement("div");
      arrIndex.classList.add("dev-console-array-key");
      arrIndex.textContent = `${index}=>`;
      itemContainer.append(arrIndex, FormatManager.redirect(item));
      container.append(itemContainer);
    });
    const rightBracket: HTMLDivElement = document.createElement("div");
    rightBracket.textContent = " ]";
    rightBracket.classList.add("dev-console-array-brecket");
    container.append(rightBracket);
    return container;
  }
  // 	private separateB(e: Event) {
  // 		console.log(this);
  // 	}
}
