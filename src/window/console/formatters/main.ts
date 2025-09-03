//import { DIV } from '../../../../types/global'
import { PrimitivesManager } from "./primitives/main.js";
import { NunPrimitivesManager } from "./nunPrimitives/main.js";
export class FormatManager {
  public static init(data: any[]) {
    const container: HTMLDivElement = document.createElement("div");
    container.classList.add("dev-console-msg-wrapper");
    data?.forEach((e) => {
      container.appendChild(FormatManager.redirect(e));
    });
    return container;
  }
  public static redirect(data: any): HTMLDivElement {
    if (data !== Object(data)) return PrimitivesManager.init(data);
    else return NunPrimitivesManager.init(data);
  }
}
