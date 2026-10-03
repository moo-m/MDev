import {
  SourceEntry,
} from "../../store/main.js";
import SourceList from "./sourceList.js";
import SourceToolbar from "./sourceToolbar.js";
import SourceViewer from "./sourceViewer.js";

export default class SourcesComponent {
  private list =
    new SourceList();

  private toolbar =
    new SourceToolbar();

  private viewer =
    new SourceViewer();

  public render(
    sources: SourceEntry[],
    activeId?: string,
  ): HTMLDivElement {
    const root =
      document.createElement(
        "div",
      );

    root.className =
      "dev-sources-page";

    const toolbar =
      this.toolbar.render();

    const body =
      document.createElement(
        "div",
      );

    body.className =
      "dev-sources-body";

    const sidebar =
      document.createElement(
        "aside",
      );

    sidebar.className =
      "dev-sources-sidebar";

    sidebar.appendChild(
      this.list.render(
        sources,
        activeId,
      ),
    );

    const viewer =
      document.createElement(
        "main",
      );

    viewer.className =
      "dev-sources-main";

    viewer.appendChild(
      this.viewer.render(
        sources.find(
          source =>
            source.id ===
            activeId,
        ),
      ),
    );

    body.append(
      sidebar,
      viewer,
    );

    root.append(
      toolbar,
      body,
    );

    return root;
  }
}
