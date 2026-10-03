import DocumentCollector from "./document.js";
import ScriptCollector from "./scripts.js";
import StyleCollector from "./styles.js";
import ResourceCollector from "./resources.js";
import FontCollector from "./fonts.js";
import Store, {
  SourceEntry,
} from "../store/main.js";

export default class SourceCollectors {
  private document =
    new DocumentCollector();

  private scripts =
    new ScriptCollector();

  private styles =
    new StyleCollector();

  private resources =
    new ResourceCollector();

  private fonts =
    new FontCollector();

  public async collect(): Promise<SourceEntry[]> {
    const sources: SourceEntry[] = [];

    sources.push(
      ...(await this.document.collect()),
    );

    sources.push(
      ...(await this.scripts.collect()),
    );

    sources.push(
      ...(await this.styles.collect()),
    );

    sources.push(
      ...(await this.resources.collect()),
    );

    sources.push(
      ...(await this.fonts.collect()),
    );

    Store.setSources(sources);

    return sources;
  }
}