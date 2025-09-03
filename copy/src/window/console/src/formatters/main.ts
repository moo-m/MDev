import { DIV } from '../../../../types/global'
import { Nums } from "./primitives/number.js";
import { Str } from "./primitives/string.js";
import { Null } from "./primitives/null.js";
import { Bool } from "./primitives/boolean.js";
import { Undefined } from "./primitives/undefined.js";
import getType from "../utils/getType.js";
import { ArrayF } from "./nunPrimitives/array.js";
import { ObjectF } from "./nunPrimitives/object.js";
export class FormatManager {
	public static start(data: any): DIV {
		switch (getType(data)) {
			case "Number":
				return new Nums().format(data);
			case "String":
				return new Str().format(data);
			case "Null":
				return new Null().format(data);
			case "Undefined":
				return new Undefined().format(data);
			case "Boolean":
				return new Bool().format(data);
			case "Array":
				return new ArrayF().format(data);
			case "Object":
			  return new ObjectF().format(data);
			default:
			case "String":
				return new Str().format(data);
		}
	}
}
