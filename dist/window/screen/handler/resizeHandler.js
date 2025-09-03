import { rectU } from "../../utils/rectUtils.js";
export class ResizeHandler {
    static resize(winEle, position) {
        const resize = document.createElement("div");
        resize.classList.add("dev-window-resize");
        resize.addEventListener("touchstart", (e) => {
            e.stopPropagation();
            const rect = rectU(winEle);
            position = Object.assign(Object.assign({}, position), { width: rect.width, height: rect.height, top: rect.top, left: rect.left });
        }, { passive: false });
        resize.addEventListener("touchmove", (e) => {
            e.stopPropagation();
            e.preventDefault();
            winEle.style.width = `${e.touches[0].clientX - position.left}px`;
            winEle.style.height = `${e.touches[0].clientY - position.top}px`;
            const rect = rectU(winEle);
            position = Object.assign(Object.assign({}, position), { width: rect.width, height: rect.height });
        }, { passive: false });
        resize.addEventListener("touchend", (e) => {
            e.stopPropagation();
            const rect = rectU(winEle);
            position = Object.assign(Object.assign({}, position), { width: rect.width, height: rect.height, top: rect.top, left: rect.left });
            winEle.style.setProperty("--dev-width", `${position.width}px`);
            winEle.style.setProperty("--dev-height", `${position.height}px`);
        }, { passive: true });
        winEle.appendChild(resize);
    }
}
