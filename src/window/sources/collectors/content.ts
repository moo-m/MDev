import {
  SourceStatus,
} from "../store/main.js";

export interface ContentResult {
  content?: string;
  mime: string;
  size: number;
  status: SourceStatus;
}

export default class SourceContent {
  public async fetch(
    url: string,
    fallbackMime = "",
  ): Promise<ContentResult> {
    try {
      const response =
        await window.fetch(url, {
          credentials: "same-origin",
        });

      const mime =
        response.headers.get(
          "content-type",
        ) ||
        fallbackMime;

      if (!response.ok) {
        return {
          mime,
          size: 0,
          status: "unavailable",
        };
      }

      const content =
        await response.text();

      return {
        content,
        mime,
        size:
          this.byteLength(content),
        status: "available",
      };
    } catch {
      return {
        mime: fallbackMime,
        size: 0,
        status: "unavailable",
      };
    }
  }

  public byteLength(
    value: string,
  ): number {
    try {
      return new Blob([value]).size;
    } catch {
      return value.length;
    }
  }
}
