export class Nums {
    format(num) {
        const el = document.createElement("div");
        el.classList.add("dev-console-number");
        el.textContent = `${num}`;
        return el;
    }
}
