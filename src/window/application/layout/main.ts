export default class ApplicationLayout {
  public static render(
    sidebar: HTMLDivElement,
    content: HTMLDivElement,
  ): HTMLDivElement {
    const root =
      document.createElement("div");

    root.classList.add(
      "dev-application-layout",
    );

    root.append(
      sidebar,
      content,
    );

    return root;
  }
}
