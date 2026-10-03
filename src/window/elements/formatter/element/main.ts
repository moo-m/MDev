import Tag from "./tags.js";
import Content from "./contents.js";
import Attributes from "./attributes.js";
import Children from "./children.js";

export default class ElementCollector {
  constructor() {}

  public collector(elementStructure: Record<string, any>): HTMLDivElement {
    const container: HTMLDivElement = document.createElement("div");

    container.classList.add("dev-element-wrapper");

    /*
     * Text / Comment / Fragment
     */
    if (
      elementStructure.name === "#text" ||
      elementStructure.name === "#comment" ||
      elementStructure.name === "#document-fragment"
    ) {
      const content = new Content(
        elementStructure.name,
        elementStructure.content,
      ).init();

      container.appendChild(content);

      elementStructure.ref = container;

      return container;
    }

    /*
     * Element attributes
     */
    const attributes = new Attributes(
      elementStructure.attributes,
    ).init();

    /*
     * Element children
     */
    const children = new Children(
      elementStructure.children,
    ).init();

    /*
     * Element tag
     */
    const tag = new Tag({
      name: elementStructure.name,
      attributes,
      children,
    }).init();

    container.appendChild(tag);

    /*
     * Link ADT node with formatter element
     */
    elementStructure.ref = container;

    return container;
  }
}