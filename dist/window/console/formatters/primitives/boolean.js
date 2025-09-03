export class Bool {
    format(data) {
        const el = document.createElement("div");
        el.classList.add("dev-console-boolean");
        el.textContent = `${data}`;
        return el;
    }
}
