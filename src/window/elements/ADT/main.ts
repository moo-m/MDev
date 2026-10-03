import Store from "../store/main.js";
export default class ADT {
  DOM: HTMLElement;
  ADT: Record<string, any>;

  constructor() {
    this.DOM = document.documentElement;
    this.ADT = {};
  }

  public init() {
    this.ADT = this.abstracting(this.DOM);
    Store.ADTSet = this.ADT;
    return this.ADT;
  }
  abstracting(node: any) {
    const elementInfo: any = {
      name: "",
      attributes: {
        children: {},
        ref: null,
      },
      children: [],
      content: "",
      ref: null,
    };
    elementInfo.name = this.abstractElementName(node);

    if (node.nodeType == Node.TEXT_NODE || node.nodeType == Node.COMMENT_NODE) {
      elementInfo.content = this.abstractContent(node);
      Store.linkerSet(node, elementInfo);
      return elementInfo;
    }
    elementInfo.attributes.children = this.abstractAttributes(node);
    elementInfo.children = this.abstractChildren(node);
    Store.linkerSet(node, elementInfo);
    return elementInfo;
  }

  private abstractElementName(node: any) {
    return node.nodeName.toLowerCase();
  }
  private abstractAttributes(node: any) {
    const children = {};
    const attributeNames = node.getAttributeNames();
    attributeNames.forEach((property: any) => {
      //@ts-ignore
      children[property] = {
        value: node.getAttribute(property),
        ref: null,
      };
    });
    return children;
  }
  private abstractContent(node: any) {
    return node.textContent;
  }
  private abstractChildren(node: any) {
    const children = [];
    if (node.childNodes) {
      for (const key of node.childNodes) {
        children.push(this.abstracting(key));
      }
    }
    return children;
  }
}
