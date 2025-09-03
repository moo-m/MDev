import { winPositionT } from "../../types/window/main";
import { rectU } from "../utils/rectUtils.js";
import { Layout } from "../screen/layout/main.js";
const div: any = document.createElement('div').textContent = 'elements'
export class ConApp {
public run() {
const { width, height } = rectU(
//@ts-ignore
document.documentElement
);
const position: winPositionT = {
width: 350,
height: 250,
top: height / 2 - 75,
left: width / 2 - 125
};
new Layout("element", div, position).render();
}
}