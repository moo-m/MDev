import { WindowBindings } from './window/console/windowBindings.js';
import { ConApp } from "./window/console/main.js";
import { Dock } from "./dock/main.js";
import { Console } from "./dock/apps/console.js";
import { Element } from "./dock/apps/element.js";
class App {
start() {
this.setupConsole();
const dock = new Dock();
dock.run();
dock.appsRender(new Console().setup());
dock.appsRender(new Element().setup());
}
private setupConsole() {
//rigester log methods on window 
new WindowBindings().init()
//render screen -> console layout
new ConApp().run();
}
}
new App().start();

// in mdev the main section does not apper intle cilick on the console dock

// window.green(1, "s", true, null);
// window.red("error");
// window.blue("info");
// window.yellow("warn");
// window.time();
// window.timeEnd();
// .test(0, M.green);

const style: any = document.styleSheets[0];
const styleSheets: any = {};

//@ts-ignore
// 	green(style.cssRules[1].selectorText);
if (style.cssRules) {
for (const cssRule of style.cssRules) {
if (cssRule?.style) {
for (const item of cssRule?.style) {
styleSheets[cssRule.selectorText] = {
...styleSheets[cssRule.selectorText],
[item]: cssRule?.style[item]
};
}
}
}}
//@ts-ignore
green("styleSheets['body']");