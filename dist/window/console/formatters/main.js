//import { DIV } from '../../../../types/global'
import { PrimitivesManager } from "./primitives/main.js";
import { NunPrimitivesManager } from "./nunPrimitives/main.js";
export class FormatManager {
    static init(data) {
        const container = document.createElement("div");
        container.classList.add("dev-console-msg-wrapper");
        data === null || data === void 0 ? void 0 : data.forEach((e) => {
            container.appendChild(FormatManager.redirect(e));
        });
        return container;
    }
    static redirect(data) {
        if (data !== Object(data))
            return PrimitivesManager.init(data);
        else
            return NunPrimitivesManager.init(data);
    }
}
