export type SourceType =
  | "document"
  | "script"
  | "stylesheet"
  | "image"
  | "media"
  | "font"
  | "other";

export type SourceStatus =
  | "available"
  | "unavailable"
  | "inline"
  | "binary"
  | "loading";

export interface SourceEntry {
  id: string;
  name: string;
  url: string;
  type: SourceType;
  mime: string;
  size: number;
  content?: string;
  status?: SourceStatus;
  source?: string;
  metadata?: Record<string, string>;
}

export default class Store {
  private static sources: SourceEntry[] = [];

  public static setSources(
    sources: SourceEntry[],
  ): void {
    this.sources = [...sources];
  }

  public static getSources(): SourceEntry[] {
    return [...this.sources];
  }

  public static getSource(
    id: string,
  ): SourceEntry | undefined {
    return this.sources.find(
      source => source.id === id,
    );
  }

  public static clear(): void {
    this.sources = [];
  }
}
