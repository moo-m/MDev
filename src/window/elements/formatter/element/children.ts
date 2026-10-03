import ElementCollector from "./main.js";

export default class Children {
  constructor(
    private children: Record<string, any>[],
  ) {}

  public init(): DocumentFragment {
    const fragment =
      document.createDocumentFragment();

    for (const node of this.children) {
      const element =
        new ElementCollector().collector(node);

      fragment.appendChild(element);
    }

    return fragment;
  }
}