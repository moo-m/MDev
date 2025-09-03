export class Null {
  public format(): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add("dev-console-null");
    el.textContent = "null";
    return el;
  }
}
