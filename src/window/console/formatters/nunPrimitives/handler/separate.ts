import Screen from "../../../../screen/main.js";
import { randomPosition } from "../../../../utils/randomPosition.js";
export function separateHandler(container: HTMLDivElement) {
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
  new Screen(
    `console-separated-${Math.round(Math.random() * 10)}`,
    node,
    randomPosition(),
  );
}
