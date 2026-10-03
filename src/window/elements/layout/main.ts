import MainL from "./mainL.js";
export default class Layout {
  constructor() {}
  public static main(content: HTMLDivElement) {
    return new MainL(content).render();
  }
}
