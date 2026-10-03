export default class SidebarItem {
  constructor(
    private label: string,
    private value: string,
    private active = false,
  ) {}

  public format(): HTMLButtonElement {
    const item =
      document.createElement("button");

    item.type = "button";

    item.classList.add(
      "dev-application-sidebar-item",
    );

    if (this.active) {
      item.classList.add("active");
    }

    item.dataset.storage =
      this.value;

    item.textContent =
      this.label;

    return item;
  }
}
