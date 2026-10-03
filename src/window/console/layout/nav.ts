import Store from "../store/main.js";
export default class Nav {
  nav: HTMLElement;
  constructor() {
    this.nav = document.createElement("nav");
  }
  public render() {
    this.nav.id = "dev-console-layout-nav";
    this.filter();
    this.clear();
    return this.nav;
  }
  private filter() {
    const container = document.createElement("div");
    container.id = "dev-console-nav-filter";
    container.append(
      this.btn({ status: "success", color: "green" }),
      this.btn({ status: "error", color: "red" }),
      this.btn({ status: "warn", color: "yellow" }),
      this.btn({ status: "info", color: "blue" }),
      this.btn({ status: "test", color: "pink" }),
      this.btn({ status: "time", color: "teal" }),
      this.btn({ status: "all", color: "black" }),
    );
    this.nav.addEventListener("click", (e: Event) => {
      //@ts-expect-error
      if (e.target.dataset.status) {
        const msgWrappers: NodeListOf<HTMLDivElement> =
          Store.consoleInfo.main!.querySelectorAll(
            "div.dev-console-msg-wrapper",
          );

        msgWrappers.forEach((element: HTMLDivElement) => {
          //@ts-expect-error
          if (e.target.dataset.status == "all") {
            element.hidden = false;
            return;
          }
          element.hidden = true;

          if (
            element?.firstElementChild!.classList[0].endsWith(
              (e.target as HTMLButtonElement).dataset.status as string,
            )
          ) {
            element.hidden = false;
          }
        });
      }
    });
    this.nav.appendChild(container);
  }
  private btn({
    status,
    color,
  }: {
    status: string;
    color: string;
  }): HTMLButtonElement {
    const btn: HTMLButtonElement = document.createElement("button");
    btn.style.backgroundColor = color;
    btn.dataset.status = status;
    return btn;
  }
  private clear() {
    const btn: HTMLButtonElement = document.createElement("button");
    btn.id = "dev-console-nav-clear-btn";
    btn.textContent = "🚫";
    btn.addEventListener("click", () => {
      window.clear();
    });
    this.nav.appendChild(btn);
  }
}
