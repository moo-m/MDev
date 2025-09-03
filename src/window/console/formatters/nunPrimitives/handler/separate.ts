import Screen from "../../../../screen/main.js";
import { winPositionT } from "../../../../../types/window/main";
import { rectU } from "../../../../utils/rectUtils.js";
export function separateHandler(container: HTMLDivElement) {
  const { width, height } = rectU(
    //@ts-expect-error
    document.documentElement,
  );
  const position: winPositionT = {
    width: 350,
    height: 250,
    top: height / 2 - 125 + Math.floor(Math.random() * 50 + 1),
    left: width / 2 - 175 + Math.floor(Math.random() * 50 + 1),
  };
  const node = container.cloneNode(true) as HTMLDivElement;
  node.addEventListener("click", (e: Event) => {
    if (
      (e.target as HTMLDivElement).matches(
        ".dev-console-separate-nunPrimitives",
      )
    ) {
      separateHandler(
        //@ts-expect-error
        (e.target! as HTMLDivElement).closest(
          ".dev-console-array, .dev-console-object",
        ),
      );
    }
  });
  new Screen("console-separated", node, position);
}
