class Store {
  /**
   * {elementOnDom : structur of element saved on ADT}
   * work as linker between element of dom and structer ADT
   */
  linker: WeakMap<any, any>;

  ADT: Record<string, any>;

  constructor() {
    this.linker = new WeakMap();
    this.ADT = {};
  }
  public linkerGet(key: any): any {
    return this.linker.get(key);
  }
  public linkerSet(key: any, value: any) {
    this.linker.set(key, value);
  }
  public linkerHas(key: any) {
    return this.linker.has(key);
  }
  public linkerDelete(key: any) {
    return this.linker.delete(key);
  }
  public get linkerData(): any {
    return this.linker;
  }
  public get ADTGet(): any {
    return this.ADT;
  }
  public set ADTSet(value: any) {
    this.ADT = value;
  }
}
export default new Store();
