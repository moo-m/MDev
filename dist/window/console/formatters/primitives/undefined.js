export class Undefined {
    format() {
        const el = document.createElement("div");
        el.classList.add("dev-console-undefined");
        el.textContent = "undefined";
        return el;
    }
}
