export class Str {
  public format(str: string): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add("dev-console-string");
    el.textContent = str;
    return el;
  }
}
