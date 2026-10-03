//@format

import { PrimitivesManager } from "./primitives/main.js";
import { NunPrimitivesManager } from "./nunPrimitives/main.js";
export class FormatManager {
  public static init(data: Record<string, unknown>[]) {
    const fragment: DocumentFragment = document.createDocumentFragment();
    data.forEach((e: any) => {
      let wrapper: HTMLDivElement = document.createElement("div");
      wrapper.classList.add("dev-console-msg-wrapper");
      const statusContainer: HTMLDivElement = document.createElement("div");
      statusContainer.classList.add(`dev-console-msg-${e.status}`);
      e.payload.forEach((e: any) => {
        statusContainer.appendChild(FormatManager.redirect(e));
      });
      wrapper.appendChild(statusContainer);
      fragment.appendChild(wrapper);
    });
    return fragment;
  }
  public static redirect(data: any): HTMLSpanElement {
    if (data !== Object(data)) return PrimitivesManager.init(data);
    else return NunPrimitivesManager.init(data);
  }
}
