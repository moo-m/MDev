import { Nums } from "./number.js";
import { Str } from "./string.js";
import { Null } from "./null.js";
import { Bool } from "./boolean.js";
import { Undefined } from "./undefined.js";
import getType from "../utils/getType.js";
export class PrimitivesManager {
    static init(data) {
        switch (getType(data)) {
            case "Number":
                return new Nums().format(data);
            case "String":
                return new Str().format(data);
            case "Boolean":
                return new Bool().format(data);
            case "Null":
                return new Null().format();
            case "Undefined":
                return new Undefined().format();
            //   case "Symbol":
            //   return new Undefined().format(data);
            //   case "Bigint":
            //   return new Undefined().format(data);
            default:
            case "String":
                return new Str().format(data);
        }
    }
}
