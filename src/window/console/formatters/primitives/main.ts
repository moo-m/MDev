//@primitive
import Prototype from "./prototype.js";
import getType from "../utils/getType.js";
export class PrimitivesManager {
  public static init(data: any): HTMLSpanElement {
    switch (getType(data)) {
      case "Number":
        return new Prototype().structure({ type: "number", data });
      case "String":
        return new Prototype().structure({ type: "string", data });
      case "Boolean":
        return new Prototype().structure({ type: "boolean", data });
      case "Null":
        return new Prototype().structure({ type: "null", data });
      case "Undefined":
        return new Prototype().structure({ type: "undefined", data });
      //   case "Symbol":
      //   return new Undefined().format(data);
      //   case "Bigint":
      //   return new Undefined().format(data);

      default:
        return new Prototype().structure({ type: "string", data });
    }
  }
}
