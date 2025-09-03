import Screen from "../../../../screen/main.js";
import { rectU } from "../../../../utils/rectUtils.js";
export function separateHandler(container) {
    const { width, height } = rectU(
    //@ts-expect-error
    document.documentElement);
    const position = {
        width: 350,
        height: 250,
        top: height / 2 - 125 + Math.floor(Math.random() * 50 + 1),
        left: width / 2 - 175 + Math.floor(Math.random() * 50 + 1),
    };
    const node = container.cloneNode(true);
    node.addEventListener("click", (e) => {
        if (e.target.matches(".dev-console-separate-nunPrimitives")) {
            separateHandler(
            //@ts-expect-error
            e.target.closest(".dev-console-array, .dev-console-object"));
        }
    });
    new Screen("console-separated", node, position);
}
