import SidebarItem from "./item.js";

export default class SidebarFormatter {
  public format(): HTMLDivElement {
    const sidebar =
      document.createElement("div");

    sidebar.classList.add(
      "dev-application-sidebar",
    );

    const title =
      document.createElement("div");

    title.classList.add(
      "dev-application-sidebar-title",
    );

    title.textContent =
      "Storage";

    const navigation =
      document.createElement("nav");

    navigation.classList.add(
      "dev-application-sidebar-nav",
    );

    navigation.append(
      new SidebarItem(
        "Local Storage",
        "localStorage",
        true,
      ).format(),

      new SidebarItem(
        "Session Storage",
        "sessionStorage",
      ).format(),

      new SidebarItem(
        "Cookies",
        "cookies",
      ).format(),

      new SidebarItem(
        "IndexedDB",
        "indexedDB",
      ).format(),

      new SidebarItem(
        "Cache Storage",
        "cache",
      ).format(),

      new SidebarItem(
        "Service Workers",
        "serviceWorkers",
      ).format(),
    );

    sidebar.append(
      title,
      navigation,
    );

    return sidebar;
  }
}
