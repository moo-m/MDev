type Primitive = string | number | boolean | bigint | null | undefined;
export default class Prototype {
  public structure({
    type,
    data,
  }: {
    type: Primitive;
    data: any;
  }): HTMLSpanElement {
    const el: HTMLSpanElement = document.createElement("span");
    el.classList.add(`dev-console-${type}`);
    el.textContent = data ?? type;
    return el;
  }
}
