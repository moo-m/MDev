//@NunPrimitives
import { ArrayF } from "./array.js";
import { ObjectF } from "./object.js";
import getType from "../utils/getType.js";
export class NunPrimitivesManager {
  public static init(data: any): HTMLDivElement {
    switch (getType(data)) {
      case "Array":
        return new ArrayF().format(data);
      case "Object":
        return new ObjectF().format(data);
      default:
        return new ObjectF().format(data);
    }
  }
}
