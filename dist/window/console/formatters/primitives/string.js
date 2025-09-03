export class Str {
    format(str) {
        const el = document.createElement("div");
        el.classList.add("dev-console-string");
        el.textContent = str;
        return el;
    }
}
