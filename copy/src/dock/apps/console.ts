//import EventBus from '../../core/window/console.js'
import { CONSOLET } from "../../types/dock/apps/console";
import { ConApp } from "../../window/console/main.js";
export class Console implements CONSOLET {
consoleApp: HTMLDivElement;
constructor() {
this.consoleApp = document.createElement("div");
}
setup() {
this.consoleApp.textContent = "e";
this.consoleApp.addEventListener("click", e => {
//@ts-ignore
const consoleWindow: HTMLDivElement = document.getElementById(
"dev-window-screen-element"
)!;
if (consoleWindow) {
consoleWindow.classList.toggle(
"dev-window-screen-console-hidden"
);
} else {
//render screen -> console layout
new ConApp().run();
//	EventBus.omit('green');
}
});

return this.consoleApp;
}
}