import { StorageData } from "../../store/main.js";
import StorageTable from "./table.js";

export default class StorageFormatter {
  constructor(private data: StorageData) {}

  public format(): HTMLDivElement {
    const container =
      document.createElement("div");

    container.classList.add(
      "dev-storage",
    );

    container.appendChild(
      new StorageTable(
        this.data,
      ).format(),
    );

    return container;
  }
}
