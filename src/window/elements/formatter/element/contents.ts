export default class Content {
  constructor(
    private name: string,
    private content: string,
  ) {}

  public init(): HTMLSpanElement {
    switch (this.name) {
      case "#text":
        return this.text();

      case "#comment":
        return this.comment();

      case "#document-fragment":
        return this.fragment();

      default:
        return this.text();
    }
  }

  /*
   * =========================================================
   * Text
   * =========================================================
   */
  private text(): HTMLSpanElement {
    const textElement =
      document.createElement("span");

    textElement.classList.add(
      "dev-element-content",
    );

    textElement.textContent = this.content;

    return textElement;
  }

  /*
   * =========================================================
   * Comment
   * =========================================================
   */
  private comment(): HTMLSpanElement {
    const comment =
      document.createElement("span");

    comment.classList.add(
      "dev-element-comment",
    );

    comment.textContent =
      `<!--${this.content}-->`;

    return comment;
  }

  /*
   * =========================================================
   * Document Fragment
   * =========================================================
   */
  private fragment(): HTMLSpanElement {
    const fragment =
      document.createElement("span");

    fragment.classList.add(
      "dev-element-fragment",
    );

    fragment.textContent =
      `<fragment>${this.content}</fragment>`;

    return fragment;
  }
}