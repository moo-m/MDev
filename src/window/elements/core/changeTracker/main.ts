import Store from "../../store/main.js";
import AttributeTracker from "./attributes.js";
import ContentTracker from "./content.js";
import ElementsTracker from "./elements.js";
export default class Tracker {
  constructor() {}
  public track() {
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {

        if (mutation.type == "attributes") {
          new AttributeTracker(Store, mutation).track();
          return;
        } else if (mutation.type == "childList") {
          new ElementsTracker(Store, mutation).track();
          return;
        } else if (mutation.type == "characterData") {
          new ContentTracker(Store, mutation).track();
          return;
        }
      }
    });
    observer.observe(document.documentElement /*Store.ADTGet.ref*/, {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true,
    });
  }
}
