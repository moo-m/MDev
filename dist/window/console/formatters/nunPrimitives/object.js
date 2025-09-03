import { FormatManager } from "../main.js";
import { separateHandler } from "./handler/separate.js";
export class ObjectF {
    format(obj) {
        console.log("object", obj);
        const container = document.createElement("div");
        container.classList.add("dev-console-object");
        const header = document.createElement("div");
        header.classList.add("dev-console-object-header");
        const title = document.createElement("div");
        title.classList.add("dev-console-object-title");
        title.textContent = `Object(${Object.keys(obj).length})`;
        const separate = document.createElement("div");
        separate.classList.add("dev-console-separate-nunPrimitives");
        separate.textContent = "->";
        separate.addEventListener("click", () => {
            separateHandler(container);
        });
        header.append(title, separate);
        const leftBracket = document.createElement("div");
        leftBracket.textContent = "{";
        leftBracket.classList.add("dev-console-object-brecket");
        container.append(header, leftBracket);
        for (const key in obj) {
            const itemContainer = document.createElement("div");
            itemContainer.classList.add("dev-console-object-items-container");
            const objKey = document.createElement("div");
            objKey.classList.add("dev-console-object-key");
            objKey.textContent = `${key} :`;
            itemContainer.append(objKey, FormatManager.redirect(obj[key]));
            container.append(itemContainer);
        }
        const rightBracket = document.createElement("div");
        rightBracket.textContent = "}";
        rightBracket.classList.add("dev-console-object-brecket");
        container.append(rightBracket);
        return container;
    }
}
