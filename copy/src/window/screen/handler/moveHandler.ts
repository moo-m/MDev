import { rectU } from "../../utils/rectUtils.js";
export class MoveHandler {
	public static move(winEle: HTMLDivElement, position: any) {
		let movable: boolean = true;
		const moveBtn: HTMLDivElement = document.createElement("div");
		moveBtn.classList.add("dev-window-move-btn");
		moveBtn.textContent = "*";
		moveBtn.addEventListener("click", () => {
			movable = !movable;
		});
		winEle.appendChild(moveBtn);
		let diffX: number, diffY: number;
		winEle.addEventListener(
			"touchstart",
			e => {
				if (!movable) return;
				const rect = rectU(winEle);
				position = {
					...position,
					top: rect.top,
					left: rect.left
				};
				diffX = e.touches[0].clientX - rect.left;
				diffY = e.touches[0].clientY - rect.top;
			},
			{ passive: false }
		);
		winEle.addEventListener(
			"touchmove",
			e => {
			  				if (!movable) return;
				e.preventDefault();
				e.stopPropagation();
				winEle.style.top = `${e.touches[0].clientY - diffY}px`;

				winEle.style.left = `${e.touches[0].clientX - diffX}px`;
			},
			{ passive: false }
		);
		winEle.addEventListener(
			"touchend",
			e => {
				if (!movable) return;
				const rect = rectU(winEle);
				position = {
					...position,
					top: rect.top,
					left: rect.left
				};
				
				winEle.style.setProperty("--dev-top",`${position.top}px`)
				
				winEle.style.setProperty("--dev-left",`${position.left}px`);
			},
			{ passive: true }
		);
	}
}
