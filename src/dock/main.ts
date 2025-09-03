import { DOCKT } from "../types/dock/main";
export class Dock implements DOCKT {
  dockElement: HTMLDivElement;
  constructor() {
    this.dockElement = document.createElement("div");
    this.dockElement.id = "dev-dock-container";
  }
  public run() {
    document.body.append(this.dockElement);
  }
  public appsRender(app: HTMLDivElement) {
    this.dockElement.append(app);
  }
}
// 	public resize() {
// 		this.dockElement.ondblclick = (e: MouseEvent) => {
// 			(e.currentTarget as HTMLDivElement).classList.toggle(
// 				"dev-dock-resize"
// 			);
// 			if (this.dockElement.classList.contains("dev-dock-resize")) {
// 				this.dockElement.style.left = `${
// 					this.dockElement.getBoundingClientRect().left + 80
// 				}px`;
// 			} else {
// 				this.dockElement.style.left = `${
// 					this.dockElement.getBoundingClientRect().left - 80
// 				}px`;
// 			}
// 		};
// 	}
// 	private move() {
// 		this.dockElement.addEventListener("touchmove", e => {
// 			e.preventDefault();
// 			if (this.dockElement.classList.contains("dev-dock-resize")) {
// 				this.dockElement.style.left = `${e.touches[0].clientX - 20}px`;
// 				this.dockElement.style.top = `${e.touches[0].clientY - 20}px`;
// 			}
// 		});
// 	}
