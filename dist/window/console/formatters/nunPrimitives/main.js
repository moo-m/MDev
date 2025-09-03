import { ArrayF } from "./array.js";
import { ObjectF } from "./object.js";
import getType from "../utils/getType.js";
export class NunPrimitivesManager {
    static init(data) {
        console.log("non", data);
        switch (getType(data)) {
            case "Array":
                return new ArrayF().format(data);
            case "Object":
                return new ObjectF().format(data);
            default:
            case "Object":
                return new ArrayF().format(data);
        }
    }
}
