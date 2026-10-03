// @Devtools
import { ConsoleManager } from "./console/main.js";
import { ElementsManager } from "./elements/main.js";
import Application from "./application/main.js";
import { randomPosition } from "./utils/randomPosition.js";
import Screen from "./screen/main.js";
import SourcesManager from "./sources/main.js";

export default class DevTools {
  public consoleApp() {
    if (window.MDev.screens.console.activate) {
      const consoleScreen =
    window.MDev.host!.querySelector("#dev-screen-console") as HTMLDivElement;
      //@ts-ignore
      consoleScreen.classList.toggle("dev-screen-hidden");
    } else {

      const container: HTMLDivElement = new ConsoleManager().init();

      window.MDev.screens.console.activate = true;

      new Screen("console", container, randomPosition());
    }
  }


  public async sourcesApp() {
    if (window.MDev.screens.sources.activate) {
      const sourcesScreen =
        window.MDev.host!.querySelector(
          "#dev-screen-sources"
        ) as HTMLDivElement | null;

      if (sourcesScreen) {
        sourcesScreen.classList.toggle(
          "dev-screen-hidden",
        );
      }

      return;
    }

    const container = await new SourcesManager().init();

    window.MDev.screens.sources.activate = true;

    new Screen(
      "sources",
      container,
      randomPosition(),
    );
  }
  

  public elementsApp() {
    if (window.MDev.screens.elements.activate) {
const elementsScreen =
    window.MDev.host!.querySelector(
        "#dev-screen-elements"
    ) as HTMLDivElement | null;
      //@ts-ignore
      elementsScreen.classList.toggle("dev-screen-hidden");
    } else {
      const container: HTMLDivElement = new ElementsManager().init();

      window.MDev.screens.elements.activate = true;

      new Screen("elements", container, randomPosition());
    }
  }
  public applicationApp() {
  if (window.MDev.screens.application.activate) {
    const applicationScreen =
      window.MDev.host!.querySelector(
        "#dev-screen-application",
      ) as HTMLDivElement | null;

    if (applicationScreen) {
      applicationScreen.classList.toggle(
        "dev-screen-hidden",
      );
    }

    return;
  }

  const container =
    new Application().init();

  window.MDev.screens.application.activate = true;

  new Screen(
    "application",
    container,
    randomPosition(),
  );
}
}
