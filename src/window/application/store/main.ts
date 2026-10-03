export interface StorageEntry {
  key: string;
  value: string;
}

export interface StorageData {
  type:
    | "localStorage"
    | "sessionStorage";
  entries: StorageEntry[];
}

export interface CookieEntry {
  name: string;
  value: string;
}

export interface IndexedDBObjectStore {
  name: string;
  count: number;
}

export interface IndexedDBEntry {
  name: string;
  version: number;
  objectStores: IndexedDBObjectStore[];
}

export interface IndexedDBRecord {
  key: string;
  value: string;
}

export interface CacheEntry {
  name: string;
}

export interface ServiceWorkerEntry {
  scope: string;
  scriptURL: string;
  state: string;
}

export interface ApplicationStore {
  localStorage: StorageData;
  sessionStorage: StorageData;
  cookies: CookieEntry[];
  indexedDB: IndexedDBEntry[];
  cache: CacheEntry[];
  serviceWorkers: ServiceWorkerEntry[];
}

class Store {
  private data: ApplicationStore = {
    localStorage: {
      type: "localStorage",
      entries: [],
    },

    sessionStorage: {
      type: "sessionStorage",
      entries: [],
    },

    cookies: [],

    indexedDB: [],

    cache: [],

    serviceWorkers: [],
  };

  public get(): ApplicationStore {
    return this.data;
  }

  public set(
    data: ApplicationStore,
  ): void {
    this.data = data;
  }

  public getStorage(
    type:
      | "localStorage"
      | "sessionStorage",
  ): StorageData {
    return this.data[type];
  }

  public setStorage(
    type:
      | "localStorage"
      | "sessionStorage",
    storage: StorageData,
  ): void {
    this.data[type] = storage;
  }

  public getCookies(): CookieEntry[] {
    return this.data.cookies;
  }

  public setCookies(
    cookies: CookieEntry[],
  ): void {
    this.data.cookies = cookies;
  }

  public setIndexedDB(
    data: IndexedDBEntry[],
  ): void {
    this.data.indexedDB = data;
  }

  public getIndexedDB(): IndexedDBEntry[] {
    return this.data.indexedDB;
  }

  public setCache(
    data: CacheEntry[],
  ): void {
    this.data.cache = data;
  }

  public getCache(): CacheEntry[] {
    return this.data.cache;
  }

  public setServiceWorkers(
    data: ServiceWorkerEntry[],
  ): void {
    this.data.serviceWorkers = data;
  }

  public getServiceWorkers():
    ServiceWorkerEntry[] {
    return this.data.serviceWorkers;
  }
}

export default new Store();
