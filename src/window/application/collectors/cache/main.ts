import Store, {
  CacheEntry,
} from "../../store/main.js";

export default class CacheCollector {
  public async collect(): Promise<CacheEntry[]> {
    const result: CacheEntry[] = [];

    if (!("caches" in window)) {
      Store.setCache(result);
      return result;
    }

    try {
      const names = await caches.keys();

      for (const name of names) {
        result.push({ name });
      }
    } catch {
      // ignore
    }

    Store.setCache(result);

    return result;
  }
}
