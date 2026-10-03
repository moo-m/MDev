//@MDiv
import LogManager from "./window/console/log/main.js";
import Dock from "./dock/main.js";

class MDev {
    init() {
        this.config();
        this.shadowHost();

        LogManager.binder();
        new Dock().init();
    }
    private shadowHost() {
        const host = document.createElement("div");
        window.MDev.host = host.attachShadow({ mode: "open" });
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "../src/style/main.css");

        window.MDev.host!.appendChild( link);
        document.body.append(host);
    }
    private config() {
        window.MDev = {
            host: null,
            screens: {
                console: {
                    activate: false
                },
                elements: {
                    activate: false
                },
                application: {
                    activate: false
                },
                settings: {
                    activate: false
                },
                sources: {
                    activate: false
                }
            }
        };
    }
}

new MDev().init();
// in mdev the main section does not apper intle cilick on the console dock

// const style: any = document.styleSheets[0];
// const styleSheets: any = {};

// // @ts-ignore
// green(style.cssRules[1].selectorText);
// if (style.cssRules) {
//     for (const cssRule of style.cssRules) {
//         if (cssRule?.style) {
//             for (const item of cssRule?.style) {
//                 styleSheets[cssRule.selectorText] = {
//                     ...styleSheets[cssRule.selectorText],
//                     [item]: cssRule?.style[item]
//                 };
//             }
//         }
//     }
// }
// // @ts-ignore
// green(styleSheets);
// window.red("hello"); // ✔️ string
// // @ts-ignore
// red(42); // ✔️ number
// // @ts-ignore
// yellow([1, 2, 3, { a: 1, b: "w" }]); // ✔️ number[]
// // @ts-ignore
// blue(["a", "b"]); // ✔️ string[]
// // @ts-ignore
// test([true, false, true]); // ✔️ boolean[]
// // @ts-ignore
// green(null); // ✔️ null
// // @ts-ignore
// green([null, undefined]); // ✔️ (null | undefined)[]
