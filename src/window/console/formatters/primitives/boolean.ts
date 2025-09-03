export class Bool {
  public format(data: boolean): HTMLDivElement {
    const el = document.createElement("div");
    el.classList.add("dev-console-boolean");
    el.textContent = `${data}`;
    return el;
  }
}
