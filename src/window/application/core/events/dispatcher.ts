export type ApplicationEvent =
  | "storage:selected"
  | "storage:changed"
  | "application:refresh";

export interface ApplicationEventPayload {
  type: ApplicationEvent;
  data?: unknown;
}

export default class EventDispatcher {
  private target = new EventTarget();

  public emit(
    type: ApplicationEvent,
    data?: unknown,
  ): void {
    this.target.dispatchEvent(
      new CustomEvent(type, {
        detail: data,
      }),
    );
  }

  public on(
    type: ApplicationEvent,
    listener: EventListener,
  ): void {
    this.target.addEventListener(type, listener);
  }

  public off(
    type: ApplicationEvent,
    listener: EventListener,
  ): void {
    this.target.removeEventListener(type, listener);
  }
}
