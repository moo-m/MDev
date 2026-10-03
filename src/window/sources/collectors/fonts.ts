import {
  SourceEntry,
} from "../store/main.js";

export default class FontCollector {
  public async collect(): Promise<SourceEntry[]> {
    const result: SourceEntry[] = [];

    try {
      let index = 0;

      for (
        const font of document.fonts
      ) {
        const family =
          font.family ||
          "Font";

        result.push({
          id:
            `font:${index}:` +
            `${family}:` +
            `${font.weight}:` +
            `${font.style}`,
          name: family,
          url: "",
          type: "font",
          mime: "",
          size: 0,
          status: "available",
          source: "document.fonts",
          metadata: {
            family,
            weight:
              font.weight,
            style:
              font.style,
            stretch:
              font.stretch,
            status:
              font.status,
          },
        });

        index++;
      }
    } catch {
      // Ignore unavailable font information.
    }

    return result;
  }
}
