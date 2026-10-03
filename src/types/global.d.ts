export type DIV = HTMLDivElement;
export type ELE = HTMLDivElement;

declare global {
  interface Window {
    MDev: {
      host: ShadowRoot | null;
      screens: {
        console: {
          activate: boolean;
        };
        elements: {
          activate: boolean;
        };
        application: {
          activate: boolean;
        };
        settings: {
          activate: boolean;
        };
        sources: {
          activate: boolean;
        };
      };
    };
    green: (...data: any[]) => void;
    red: (...data: any[]) => void;
    blue: (...data: any[]) => void;
    yellow: (...data: any[]) => void;
    test: (condition: any, ...data: any[]) => void;
    time: (lable?: string) => void;
    timeEnd: (lable?: string) => void;
    clear: () => void;
  }

  interface Object {
    prototype: {
      green: () => void;
      red: () => void;
      blue: () => void;
      yellow: () => void;
      test: () => void;
      time: () => void;
      timeEnd: () => void;
    };
  }
}
