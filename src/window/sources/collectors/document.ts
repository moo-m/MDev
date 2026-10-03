import {
  SourceEntry,
} from "../store/main.js";

export default class DocumentCollector {
  public async collect(): Promise<SourceEntry[]> {
    const content =
      document.documentElement
        ?.outerHTML || "";

    return [
      {
        id: "document",
        name:
          document.title ||
          "Document",
        url: location.href,
        type: "document",
        mime:
          document.contentType ||
          "text/html",
        size:
          new Blob([content]).size,
        content,
        status: "available",
        source: "document",
      },
    ];
  }
}
