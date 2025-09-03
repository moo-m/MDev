export default class Layout {
    constructor() {
        this.container = document.createElement("div");
    }
    init() {
        this.container.id = "dev-layout-console";
        this.header();
        return this.container;
    }
    main(content) {
        const main = document.createElement("div");
        main.id = "dev-console-main-section";
        main.appendChild(content);
        this.container.appendChild(main);
    }
    header(content /*HTMLDivElement*/ = undefined) {
        const head = document.createElement("div");
        head.classList.add("dev-console-headerL");
        head.textContent = "head";
        //head.appendChild(content);
        this.container.appendChild(head);
    }
}
