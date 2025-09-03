export class Nums {
  public format(num: number): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add("dev-console-number");
    el.textContent = `${num}`;
    return el;
  }
}
