//import EventBus from '../../../core/window/console.js'
import { MCONSOLE } from "../../../types/window/console/src/main";
import { LogManager } from "./logManager.js";
import getTime from "./utils/getTime.js";
export class MConsole implements MCONSOLE {
private logContainer: HTMLDivElement;
constructor() {
this.logContainer = document.createElement("div");
}
public init(): HTMLDivElement {
this.logContainer = document.createElement("div");
this.logContainer.classList.add("dev-console-main-container");
return this.logContainer;
}
public green(...data: any[]) {
//EventBus.on('green', data);
this.logContainer.appendChild(LogManager.run([...data, "success"]));
}
public red(...data: any[]) {
this.logContainer.appendChild(LogManager.run([...data, "error"]));
}
public blue(...data: any[]) {
this.logContainer.appendChild(LogManager.run([...data, "info"]));
}
public yellow(...data: any[]) {
this.logContainer.appendChild(LogManager.run([...data, "warn"]));
}
public test(condition: any, data: any[]) {
if (condition) {
this.logContainer.appendChild(LogManager.run([data, "test"]));
}
}
public time(label: string = "time start") {
this.logContainer.appendChild(
LogManager.run([label, getTime(), "time"])
);
}
public timeEnd(label: string = "time end") {
this.logContainer.appendChild(
LogManager.run([label, getTime(), "time"])
);
}
}
//MDev.init to render main container on the main layout of console