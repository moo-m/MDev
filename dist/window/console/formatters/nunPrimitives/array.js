import { FormatManager } from "../main.js";
import { separateHandler } from "./handler/separate.js";
export class ArrayF {
    format(array) {
        const container = document.createElement("div");
        container.classList.add("dev-console-array");
        const header = document.createElement("div");
        header.classList.add("dev-console-array-header");
        const title = document.createElement("div");
        title.classList.add("dev-console-array-title");
        title.textContent = `Array(${array.length})`;
        const separate = document.createElement("div");
        separate.classList.add("dev-console-separate-nunPrimitives");
        separate.textContent = ">>";
        separate.addEventListener("click", () => {
            separateHandler(container);
        });
        header.append(title, separate);
        const leftBracket = document.createElement("div");
        leftBracket.textContent = " [";
        leftBracket.classList.add("dev-console-array-brecket");
        container.append(header, leftBracket);
        array.forEach((item, index) => {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("dev-console-array-items-container");
            const arrIndex = document.createElement("div");
            arrIndex.classList.add("dev-console-array-key");
            arrIndex.textContent = `${index}=>`;
            itemContainer.append(arrIndex, FormatManager.redirect(item));
            container.append(itemContainer);
        });
        const rightBracket = document.createElement("div");
        rightBracket.textContent = " ]";
        rightBracket.classList.add("dev-console-array-brecket");
        container.append(rightBracket);
        return container;
    }
}
