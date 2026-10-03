export default class HeaderFormatter {
  public format(): HTMLDivElement {
    const header =
      document.createElement("header");

    header.classList.add(
      "dev-application-header",
    );

    const title =
      document.createElement("div");

    title.classList.add(
      "dev-application-title",
    );

    title.textContent =
      "Application";

    const subtitle =
      document.createElement("div");

    subtitle.classList.add(
      "dev-application-subtitle",
    );

    subtitle.textContent =
      "Storage and browser data";

    header.append(
      title,
      subtitle,
    );
//@ts-ignore
    return header;
  }
}
