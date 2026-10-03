//@dock
import { DOCKT } from "../types/dock/main";
import Console from "./apps/console.js";
import Elements from "./apps/elements.js";
import Application from "./apps/application.js";
import SourcesApp from "./apps/sources.js";
export default class Dock implements DOCKT {
    dockElement: HTMLDivElement;
    constructor() {
        this.dockElement = document.createElement("div");
        this.dockElement.id = "dev-dock-container";
    }
    public init() {
        window.MDev.host!.append(this.dockElement);
        //@console btn
        this.appsRender(new Console().setup());
        //@element btn
        this.appsRender(new Elements().setup());
        //@application btn
        this.appsRender(new Application().setup());
        //@sources btn
        this.appsRender(new SourcesApp().setup());
    }
    public appsRender(app: HTMLDivElement) {
        this.dockElement.append(app);
    }
}
