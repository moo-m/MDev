// //import EventBus from '../../core/window/console.js'
// import { ELEMENT } from "../../types/dock/apps/element";
// import { EleApp } from "../../window/element/main.js";
// export class Element implements ELEMENT {
// elementApp: HTMLDivElement;
// constructor() {
// this.elementApp = document.createElement("div");
// }
// setup() {
// this.elementApp.textContent = "e";
// this.elementApp.addEventListener("click", e => {
// //@ts-expect-error
// const elementWindow: HTMLDivElement = document.getElementById(
// "dev-window-screen-element"
// )!;
// if (elementWindow) {
// elementWindow.classList.toggle(
// "dev-window-screen-element-hidden"
// );
// } else {
// //render screen -> console layout
// new EleApp().run();
// //	EventBus.omit('green');
// }
// });

// return this.elementApp;
// }
// }
