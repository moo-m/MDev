import DevTools from "./window/main.js";
import { Dock } from "./dock/main.js";
import { Console } from "./dock/apps/console.js";
// import { Element } from "./dock/apps/element.js";
class App {
  start() {
    console.log("1-start");
    //this.setupConsole();
    const dock = new Dock();
    dock.run();
    dock.appsRender(new Console().setup());
    //dock.appsRender(new Element().setup());
    
    //run console
    new DevTools().consoleApp()
  }
}

new App().start();

// in mdev the main section does not apper intle cilick on the console dock

window.green(1, "s", true, null);
window.red("error");
window.blue("info");
window.yellow("warn");
window.time();
window.timeEnd();
window.test(0, 'test');

const style: any = document.styleSheets[0];
const styleSheets: any = {};

//5@ts-expect-error
// 	green(style.cssRules[1].selectorText);
if (style.cssRules) {
  for (const cssRule of style.cssRules) {
    if (cssRule?.style) {
      for (const item of cssRule?.style) {
        styleSheets[cssRule.selectorText] = {
          ...styleSheets[cssRule.selectorText],
          [item]: cssRule?.style[item],
        };
      }
    }
  }
}
//@ts-expect-error
green([1, 2, [3, [5]], 5], styleSheets["html"]);
