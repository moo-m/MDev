import { ConsoleManager } from "../main.js";
export default class MainL {
  constructor(private content: DocumentFragment) {}
  public render() {
    const main: HTMLDivElement = document.createElement("div");
    main.id = "dev-console-layout-main";
    main.append(this.content, this.input());
    return main;
  }
  private input(): HTMLDivElement {
    const container = document.createElement("div");
    container.classList.add("dev-console-main-container-input");
    const input: HTMLInputElement = document.createElement("input");
    input.type = "text";
    input.placeholder = "type here...";
    input.classList.add("dev-console-main-input");
    const submit = document.createElement("buttin");
    submit.textContent = ">>";
    submit.classList.add("dev-console-main-btn-submit");

    submit.addEventListener("click", (e) => {
      if (!(input as HTMLInputElement).value) return;
      const consoleM = new ConsoleManager();
      consoleM.addMsg({
        status: "success",
        payload: [(input as HTMLInputElement).value],
      });

      //window.green((input as HTMLInputElement).value);
      try {
        consoleM.addMsg({
          status: "success",
          payload: [eval((input as HTMLInputElement).value)],
        });
        (input as HTMLInputElement).value = "";
      } catch (error) {
        //@ts-expect-error
        consoleM.addMsg({ status: "error", payload: [error.message] });
        // window.red(error.message);
      }
    });
    container.append(input, submit);
    return container;
  }
}
