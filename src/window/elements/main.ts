import Tracker from "./core/changeTracker/main.js";
import Layout from "./layout/main.js";
import ADT from "./ADT/main.js";
import Formatter from "./formatter/main.js";
export class ElementsManager {
  public init(): HTMLDivElement {
    const container: HTMLDivElement = document.createElement("div");
    container.id = "dev-elements-container";
    //get structure
    const treeStructure = new ADT().init();

    //format data
    const format = new Formatter(treeStructure).format();
    const main = Layout.main(format);

    container.appendChild(main);
    new Tracker().track();
    return container;
  }
}
/**
*treeStructure
{
    "name": "div",
    "attributes": {
        "children": {
            "class": {
                "value": "container",
                "ref": null
            },
            "id": {
                "value": "containerId",
                "ref": null
            }
        },
        "ref": null
    },
    "children": [
        {
            "name": "#text",
            "attributes": {
                "children": {},
                "ref": null
            },
            "children": [],
            "content": "\n            upper\n            ",
            "ref": null
        },
        {
            "name": "span",
            "attributes": {
                "children": {
                    "class": {
                        "value": "spanClass",
                        "ref": null
                    }
                },
                "ref": null
            },
            "children": [
                {
                    "name": "#text",
                    "attributes": {
                        "children": {},
                        "ref": null
                    },
                    "children": [],
                    "content": "spaan",
                    "ref": null
                }
            ],
            "content": "",
            "ref": null
        },
        {
            "name": "#text",
            "attributes": {
                "children": {},
                "ref": null
            },
            "children": [],
            "content": "\n            lower\n        ",
            "ref": null
        }
    ],
    "content": "",
    "ref": null
}
 * format 
<div id="dev-elements-formated"><div class="dev-element-wrapper"><div class="tag">&lt;div<div class="dev-element-attributes"><span class="dev-elements-attribute-class-key">class</span><span class="dev-elements-attribute-class-value">="container" </span><span class="dev-elements-attribute-id-key">id</span><span class="dev-elements-attribute-id-value">="containerId" </span></div>&gt;<div class="dev-element-wrapper"><span>
            upper
            </span></div><div class="dev-element-wrapper"><div class="inline">&lt;span<div class="dev-element-attributes"><span class="dev-elements-attribute-class-key">class</span><span class="dev-elements-attribute-class-value">="spanClass" </span></div>/&gt;</div></div><div class="dev-element-wrapper"><span>
            lower
        </span></div>&lt;/div&gt;</div></div></div>
*/
