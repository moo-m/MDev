import Screen from '../main.js';
export class Layout {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.container = document.createElement('div');
        this.container.classList.add('dev-main-console');
        new Screen(this.name, this.container, this.position);
    }
    main(content) {
        const main = document.createElement('div');
        main.classList.add('dev-console-mainL');
        main.appendChild(content);
        this.container.appendChild(main);
    }
    header(content) {
        const head = document.createElement('div');
        head.classList.add('dev-console-headerL');
        head.appendChild(content);
        this.container.appendChild(head);
    }
}
