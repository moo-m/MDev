import {
  SourceEntry,
} from "../store/main.js";
import SourceContent from "./content.js";

export default class ScriptCollector {
  private content =
    new SourceContent();

  public async collect(): Promise<SourceEntry[]> {
    const elements =
      Array.from(
        document.querySelectorAll(
          "script",
        ),
      );

    return Promise.all(
      elements.map(
        async (element, index) => {
          const src =
            element.src;

          if (!src) {
            const value =
              element.textContent ||
              "";

            return {
              id:
                `script:inline:` +
                `${index}`,
              name:
                `Inline Script ${index + 1}`,
              url: location.href,
              type: "script",
              mime:
                element.type ||
                "text/javascript",
              size:
                this.content.byteLength(
                  value,
                ),
              content: value,
              status: "inline",
              source: "inline",
            };
          }

          const result =
            await this.content.fetch(
              src,
              element.type ||
                "text/javascript",
            );

          return {
            id:
              `script:${index}:${src}`,
            name: this.name(src),
            url: src,
            type: "script",
            mime:
              result.mime ||
              "text/javascript",
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
