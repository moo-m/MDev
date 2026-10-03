export default class UI_Tree {
  public static create(
    label: string,
  ): HTMLDivElement {
    const tree =
      document.createElement("div");

    tree.classList.add(
      "dev-ui-tree",
    );

    tree.textContent = label;

    return tree;
  }
}
