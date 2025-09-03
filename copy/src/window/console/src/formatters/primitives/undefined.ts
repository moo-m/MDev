export class Undefined {
  public format(data:undefined):HTMLDivElement{
    const el=document.createElement('div');
    el.classList.add('dev-console-undefined');
    el.textContent=`${data}`;
    return el;
  }
}