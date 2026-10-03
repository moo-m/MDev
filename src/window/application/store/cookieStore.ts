import Store, { CookieEntry } from "./main.js";

export default class CookieStore {
  public collect(): CookieEntry[] {
    const cookies: CookieEntry[] = [];

    if (!document.cookie) {
      Store.setCookies(cookies);
      return cookies;
    }

    for (const item of document.cookie.split(";")) {
      const separator = item.indexOf("=");

      if (separator === -1) {
        continue;
      }

      const name = item.slice(0, separator).trim();
      const value = item.slice(separator + 1).trim();

      cookies.push({
        name,
        value,
      });
    }

    Store.setCookies(cookies);

    return cookies;
  }

  public set(
    name: string,
    value: string,
  ): void {
    if (!name.trim()) {
      return;
    }

    document.cookie =
      `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/`;

    this.collect();
  }

  public remove(name: string): void {
    document.cookie =
      `${encodeURIComponent(name)}=; ` +
      "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

    this.collect();
  }

  public clear(): void {
    const cookies = this.collect();

    for (const cookie of cookies) {
      this.remove(cookie.name);
    }

    this.collect();
  }
}
