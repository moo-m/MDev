import {ConsoleManager} from "./console/main.js";
import { randomPosition } from "./utils/randomPosition.js";
import Screen from "./screen/main.js";
export default class DevTools {
  public  consoleApp() {
    //get console content
    const container = new ConsoleManager().init();
    //render screen
    new Screen("console", container, randomPosition());
  }
}
/*
  1-render screen layout;
  2-render content;
  3-save screen;
*/
