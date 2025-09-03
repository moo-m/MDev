export class Undefined {
  public format(): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add("dev-console-undefined");
    el.textContent = "undefined";
    return el;
  }
}
