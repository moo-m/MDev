export default class Tag {
  name: string;
  attributes: HTMLDivElement;
  children: DocumentFragment;

  constructor({
    name,
    attributes,
    children,
  }: {
    name: string;
    attributes: HTMLDivElement;
    children: DocumentFragment;
  }) {
    this.name = name;
    this.attributes = attributes;
    this.children = children;
  }

  public init(): HTMLDivElement {
    if (this.voidElements()) {
      return this.voidElementTag();
    }

    return this.elementTag();
  }

  /*
   * =========================================================
   * Normal element
   *
   * <div class="container">
   *   ...
   * </div>
   * =========================================================
   */
  private elementTag(): HTMLDivElement {
    const tag = document.createElement("div");

    tag.classList.add("dev-element-tag");

    /*
     * <
     */
    const openingBracket = document.createElement("span");

    openingBracket.classList.add(
      "dev-element-bracket",
    );

    openingBracket.textContent = "<";

    /*
     * tag name
     */
    const name = document.createElement("span");

    name.classList.add(
      "dev-element-tag-name",
    );

    name.textContent = this.name;

    /*
     * >
     */
    const openingCloseBracket = document.createElement("span");

    openingCloseBracket.classList.add(
      "dev-element-bracket",
    );

    openingCloseBracket.textContent = ">";

    /*
     * </tag>
     */
    const closingTag = document.createElement("div");

    closingTag.classList.add(
      "dev-element-closing-tag",
    );

    const closingOpeningBracket = document.createElement("span");

    closingOpeningBracket.classList.add(
      "dev-element-bracket",
    );

    closingOpeningBracket.textContent = "</";

    const closingName = document.createElement("span");

    closingName.classList.add(
      "dev-element-tag-name",
    );

    closingName.textContent = this.name;

    const closingBracket = document.createElement("span");

    closingBracket.classList.add(
      "dev-element-bracket",
    );

    closingBracket.textContent = ">";

    closingTag.append(
      closingOpeningBracket,
      closingName,
      closingBracket,
    );

    /*
     * Opening tag
     */
    const openingTag = document.createElement("div");

    openingTag.classList.add(
      "dev-element-opening-tag",
    );

    openingTag.append(
      openingBracket,
      name,
      this.attributes,
      openingCloseBracket,
    );

    /*
     * Children
     */
    const children = document.createElement("div");

    children.classList.add(
      "dev-element-children",
    );

    children.appendChild(this.children);

    /*
     * Complete element
     */
    tag.append(
      openingTag,
      children,
      closingTag,
    );

    return tag;
  }

  /*
   * =========================================================
   * Void element
   *
   * <img src="...">
   * <input type="text">
   * =========================================================
   */
  private voidElementTag(): HTMLDivElement {
    const tag = document.createElement("div");

    tag.classList.add("dev-element-tag");

    const openingBracket = document.createElement("span");

    openingBracket.classList.add(
      "dev-element-bracket",
    );

    openingBracket.textContent = "<";

    const name = document.createElement("span");

    name.classList.add(
      "dev-element-tag-name",
    );

    name.textContent = this.name;

    const closingBracket = document.createElement("span");

    closingBracket.classList.add(
      "dev-element-bracket",
    );

    closingBracket.textContent = ">";

    tag.append(
      openingBracket,
      name,
      this.attributes,
      closingBracket,
    );

    return tag;
  }

  /*
   * =========================================================
   * HTML void elements
   * =========================================================
   */
  private voidElements(): boolean {
    const voidElements = new Set([
      "AREA",
      "BASE",
      "BR",
      "COL",
      "EMBED",
      "HR",
      "IMG",
      "INPUT",
      "LINK",
      "META",
      "SOURCE",
      "TRACK",
      "WBR",
    ]);

    return voidElements.has(
      this.name.toUpperCase(),
    );
  }
}