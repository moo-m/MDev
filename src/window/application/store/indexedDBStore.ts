import Store, {
  IndexedDBEntry,
  IndexedDBObjectStore,
  IndexedDBRecord,
} from "./main.js";

export default class IndexedDBStore {
  public async collect(): Promise<IndexedDBEntry[]> {
    const result: IndexedDBEntry[] = [];

    if (!("indexedDB" in window)) {
      Store.setIndexedDB(result);
      return result;
    }

    const databases =
      indexedDB.databases
        ? await indexedDB.databases()
        : [];

    for (const database of databases) {
      if (!database.name) {
        continue;
      }

      const objectStores: IndexedDBObjectStore[] = [];

      try {
        const db =
          await this.open(
            database.name,
            database.version,
          );

        for (
          let index = 0;
          index < db.objectStoreNames.length;
          index++
        ) {
          const name =
            db.objectStoreNames[index];

          const count =
            await this.count(
              db,
              name,
            );

          objectStores.push({
            name,
            count,
          });
        }

        db.close();

        result.push({
          name: database.name,
          version: database.version ?? 0,
          objectStores,
        });
      } catch {
        result.push({
          name: database.name,
          version: database.version ?? 0,
          objectStores: [],
        });
      }
    }

    Store.setIndexedDB(result);

    return result;
  }

  public async records(
    databaseName: string,
    storeName: string,
    version?: number,
  ): Promise<IndexedDBRecord[]> {
    const result: IndexedDBRecord[] = [];

    try {
      const db =
        await this.open(
          databaseName,
          version,
        );

      const transaction =
        db.transaction(
          storeName,
          "readonly",
        );

      const objectStore =
        transaction.objectStore(
          storeName,
        );

      await new Promise<void>(
        resolve => {
          const request =
            objectStore.openCursor();

          request.onsuccess = () => {
            const cursor =
              request.result;

            if (!cursor) {
              resolve();
              return;
            }

            result.push({
              key: this.safeValue(
                cursor.key,
              ),
              value: this.safeValue(
                cursor.value,
              ),
            });

            cursor.continue();
          };

          request.onerror = () => {
            resolve();
          };
        },
      );

      db.close();
    } catch {
      // Ignore inaccessible databases.
    }

    return result;
  }

  public async addRecord(
    databaseName: string,
    storeName: string,
    value: unknown,
    key?: IDBValidKey,
    version?: number,
  ): Promise<boolean> {
    return this.writeRecord(
      databaseName,
      storeName,
      "add",
      value,
      key,
      version,
    );
  }

  public async updateRecord(
    databaseName: string,
    storeName: string,
    key: IDBValidKey,
    value: unknown,
    version?: number,
  ): Promise<boolean> {
    return this.writeRecord(
      databaseName,
      storeName,
      "put",
      value,
      key,
      version,
    );
  }

  public async deleteRecord(
    databaseName: string,
    storeName: string,
    key: IDBValidKey,
    version?: number,
  ): Promise<boolean> {
    try {
      const db =
        await this.open(
          databaseName,
          version,
        );

      const transaction =
        db.transaction(
          storeName,
          "readwrite",
        );

      const objectStore =
        transaction.objectStore(
          storeName,
        );

      await new Promise<void>(
        (resolve, reject) => {
          const request =
            objectStore.delete(key);

          request.onsuccess =
            () => resolve();

          request.onerror =
            () => reject(
              request.error,
            );
        },
      );

      db.close();

      return true;
    } catch {
      return false;
    }
  }

  private async writeRecord(
    databaseName: string,
    storeName: string,
    operation: "add" | "put",
    value: unknown,
    key?: IDBValidKey,
    version?: number,
  ): Promise<boolean> {
    try {
      const db =
        await this.open(
          databaseName,
          version,
        );

      const transaction =
        db.transaction(
          storeName,
          "readwrite",
        );

      const objectStore =
        transaction.objectStore(
          storeName,
        );

      await new Promise<void>(
        (resolve, reject) => {
          let request: IDBRequest;

          if (
            key === undefined
          ) {
            request =
              objectStore[operation](
                value,
              );
          } else {
            request =
              objectStore[operation](
                value,
                key,
              );
          }

          request.onsuccess =
            () => resolve();

          request.onerror =
            () => reject(
              request.error,
            );
        },
      );

      db.close();

      return true;
    } catch {
      return false;
    }
  }

  private open(
    name: string,
    version?: number,
  ): Promise<IDBDatabase> {
    return new Promise(
      (resolve, reject) => {
        const request =
          version
            ? indexedDB.open(
                name,
                version,
              )
            : indexedDB.open(name);

        request.onsuccess =
          () => {
            resolve(
              request.result,
            );
          };

        request.onerror =
          () => {
            reject(
              request.error,
            );
          };
      },
    );
  }

  private count(
    db: IDBDatabase,
    storeName: string,
  ): Promise<number> {
    return new Promise(
      resolve => {
        try {
          const transaction =
            db.transaction(
              storeName,
              "readonly",
            );

          const request =
            transaction
              .objectStore(storeName)
              .count();

          request.onsuccess =
            () => {
              resolve(
                request.result,
              );
            };

          request.onerror =
            () => {
              resolve(0);
            };
        } catch {
          resolve(0);
        }
      },
    );
  }

  private safeValue(
    value: unknown,
  ): string {
    try {
      if (
        typeof value ===
          "string"
      ) {
        return value;
      }

      return JSON.stringify(
        value,
        null,
        2,
      );
    } catch {
      return String(value);
    }
  }
}
