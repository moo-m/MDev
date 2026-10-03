//@Layout
import MainL from "./mainL.js";
import Nav from "./nav.js";
export default class Layout {
  public static main(content: DocumentFragment) {
    return new MainL(content).render();
  }
  public static nav() {
    return new Nav().render();
  }
}
