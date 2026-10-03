import Attributes from "../../formatter/element/attributes.js";
export default class AttributeTracker {
  constructor(
    private Store: any,
    private mutation: any,
  ) {}

  public track() {
    //change attributes on Store/dataRecorded/object of the element
    let attributeStructer = this.Store.linkerGet(this.mutation.target)
      .attributes.children[this.mutation.attributeName!];
    //if attribute is already exist
    if (attributeStructer) {
      // get value of attribute changed
      const value = (this.mutation.target as HTMLElement).getAttribute(
        this.mutation.attributeName!,
      );
      // change the Attribute value in MDev element structure
      attributeStructer.value = value;
      // change the Attribute value in MDev/element
      attributeStructer.ref.textContent = `="${attributeStructer.value}"`;
    } else {
      //get the Attribute structure of the MDev/elements
      let attributes = this.Store.linkerGet(this.mutation.target).attributes;
      //get the value that is changed on the dom
      const value = (this.mutation.target as HTMLElement).getAttribute(
        this.mutation.attributeName!,
      );
      //create child structure
      const newAttributeChildrenStructure = {
        [this.mutation.attributeName!]: {
          value,
          ref: null,
        },
      };

      //add new structure to children
      Object.assign(attributes.children, newAttributeChildrenStructure);
      // get ref to last attributes container element
      const attributesContainerRef = attributes.ref;

      const child = new Attributes(attributes).init();
      //reolace old attributes container with new one
      attributesContainerRef.replaceWith(child);
      //remove old element
      attributesContainerRef.remove();
    }
  }
}
