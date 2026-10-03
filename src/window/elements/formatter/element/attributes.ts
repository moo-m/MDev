export default class Attributes {
  constructor(
    private attributes: Record<string, any>,
  ) {}

  public init(): HTMLDivElement {
    const container: HTMLDivElement =
      document.createElement("div");

    container.classList.add(
      "dev-element-attributes",
    );

    /*
     * Keep reference to formatter attributes container
     */
    this.attributes.ref = container;

    for (
      const attribute in this.attributes.children
    ) {
      const attributeData =
        this.attributes.children[attribute];

      /*
       * Attribute key
       *
       * class
       * id
       * style
       */
      const propertyKey: HTMLSpanElement =
        document.createElement("span");

      propertyKey.classList.add(
        "dev-element-attribute-key",
        `dev-elements-attribute-${attribute}-key`,
      );

      propertyKey.textContent = attribute;

      /*
       * Attribute value
       *
       * ="container"
       */
      const propertyValue: HTMLSpanElement =
        document.createElement("span");

      propertyValue.classList.add(
        "dev-element-attribute-value",
        `dev-elements-attribute-${attribute}-value`,
      );

      propertyValue.textContent =
        `="${attributeData.value}"`;

      /*
       * Keep reference to formatter attribute value
       */
      attributeData.ref = propertyValue;

      /*
       * Add spacing between attributes
       */
      const spacing =
        document.createTextNode(" ");

      container.append(
        propertyKey,
        propertyValue,
        spacing,
      );
    }

    return container;
  }
}