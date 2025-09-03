import { LogBind } from "./bind.js";
import { Logger } from "./logger.js";
export default class LogManager {
  constructor() {}
  public static init() {
    //bind with window
    if(!window.green)
    new LogBind(new Logger()).init();
  }
}

// import { FormatManager } from "./formatters/main.js";
// import { DIV } from '../../../types/global'
// export class LogManager {
// 	public static run(data: any[]): DIV {
// 	  const category:string=data.pop();
// 		const msgContainer: DIV = document.createElement("div");
// 		msgContainer.classList.add("dev-console-msgContainer",`dev-console-msg-${category}`);
// 		data.forEach((item: any) => {
// 			msgContainer.appendChild(FormatManager.start(item));
// 		});
// 		return msgContainer;
// 	}
// }
