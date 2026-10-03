import Store, {
  ServiceWorkerEntry,
} from "../../store/main.js";

export default class ServiceWorkerCollector {
  public async collect(): Promise<ServiceWorkerEntry[]> {
    const result: ServiceWorkerEntry[] = [];

    if (!("serviceWorker" in navigator)) {
      Store.setServiceWorkers(result);
      return result;
    }

    try {
      const registrations =
        await navigator.serviceWorker.getRegistrations();

      for (const registration of registrations) {
        const worker =
          registration.active ??
          registration.waiting ??
          registration.installing;

        result.push({
          scope: registration.scope,
          scriptURL: worker?.scriptURL ?? "",
          state: worker?.state ?? "unknown",
        });
      }
    } catch {
      // ignore
    }

    Store.setServiceWorkers(result);

    return result;
  }
}
