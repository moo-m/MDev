import ElementCollector from "./element/main.js";

export default class Formatter {
  constructor(private treeStructure: Record<string, any>) {}

  public format(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement("div");

    container.id = "dev-elements-formated";

    container.appendChild(
      new ElementCollector().collector(this.treeStructure),
    );

    return container;
  }
}