import {
  SourceEntry,
} from "../store/main.js";
import SourceContent from "./content.js";

export default class StyleCollector {
  private content =
    new SourceContent();

  public async collect(): Promise<SourceEntry[]> {
    const elements =
      Array.from(
        document.querySelectorAll(
          'link[rel~="stylesheet"], style',
        ),
      );

    return Promise.all(
      elements.map(
        async (element, index) => {
          if (
            element.tagName ===
            "STYLE"
          ) {
            const value =
              element.textContent ||
              "";

            return {
              id:
                `stylesheet:inline:` +
                `${index}`,
              name:
                `Inline Style ${index + 1}`,
              url: location.href,
              type: "stylesheet",
              mime: "text/css",
              size:
                this.content.byteLength(
                  value,
                ),
              content: value,
              status: "inline",
              source: "inline",
            };
          }

          const link =
            element as HTMLLinkElement;

          const href =
            link.href;

          const result =
            await this.content.fetch(
              href,
              "text/css",
            );

          return {
            id:
              `stylesheet:${index}:` +
              `${href}`,
            name: this.name(href),
            url: href,
            type: "stylesheet",
            mime:
              result.mime ||
              "text/css",
            size: result.size,
            content: result.content,
            status: result.status,
            source: "external",
          };
        },
      ),
    );
  }

  private name(
    url: string,
  ): string {
    try {
      return (
        new URL(url).pathname
          .split("/")
          .filter(Boolean)
          .pop() ||
        url
      );
    } catch {
      return url;
    }
  }
}
