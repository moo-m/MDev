import ADT from "../../ADT/main.js";
// import Formatter from "../../formatter/main.js";
import ElementCollector from "../../formatter/element/main.js";

export default class ElementsTracker {
  constructor(
    private Store: any,
    private mutation: any,
  ) {}

  public track() {
    const target = this.Store.linkerGet(this.mutation.target);

    if (this.mutation.addedNodes.length) {
      for (let node of this.mutation.addedNodes) {
        if (node.nodeName == "#text") {
          const newNode = document.createTextNode(node);
          // newNode.textContent=node
          node = newNode;
        }
        // const elementStructer = new ADT().abstracting(node);
        if (node.nodeName == "#text") {
          const child = this.Store.linkerGet(node);

          // child.ref.textContent = node.textContent;
          // const elementStructer = new ADT().abstracting(node);
          // // const cloneContainer = this.Store.linkerGet(
          // //     this.mutation.target
          // // );
          // target.children = [child];
          // const oldRef = target.ref;
          // //add element structur to his parent
          // cloneContainer.children.push(elementStructer);
          // //format
          // const elements = new ElementCollector().collector(
          //     cloneContainer
          // );
          // oldRef.replaceWith(elements);

          return;
        }
        const elementStructer = new ADT().abstracting(node);

        //format
        const elements = new ElementCollector().collector(elementStructer);
        //add to mdev/elementsStructer
        target.children.push(elementStructer);
        target.ref.appendChild(elements);
      }
    }
    if (this.mutation.removedNodes.length) {
      for (const node of this.mutation.removedNodes) {
        const child = this.Store.linkerGet(node);
        //remove to mdev/elementsStructer
        target.children = target.children.filter(
          (el: Record<string, any>) => el.ref != child.ref,
        );
        this.Store.linkerDelete(node);
        child.ref.remove();
      }
    }
  }
}
