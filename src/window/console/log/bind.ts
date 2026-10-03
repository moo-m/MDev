import { CONSOLET } from "../../../types/window/console/main";
export default class LogBind {
  static methodNames: CONSOLET.methodNamer = [
    "green",
    "red",
    "blue",
    "yellow",
    "test",
    "time",
    "timeEnd",
    "clear",
  ];

  public static bind(methods: any) {
    //usage [green](data)
    LogBind.setOnWindow(methods);
    //usage [data].green()
    LogBind.setOnObject(methods);
    //usage console[log,error...](data)
    // LogBind.replaceConsole();
  }
  private static setOnWindow(methods: any) {
    //make console methods usable
    //add method to global

    for (const name of LogBind.methodNames) {
      if (window) {
        window[name] = (...args: any[]) => {
          (methods as any)[name](...args);
        };
      }
      (globalThis as any)[name] = (...args: any[]) => {
        (methods as any)[name](...args);
      };
    }
  }
  private static setOnObject(methods: any) {
    //add method to Object
    for (const name of LogBind.methodNames) {
      if (!Object.hasOwnProperty(name)) {
        Object.defineProperty(Object.prototype, name, {
          value: function () {
            methods[name](this);
          },
          writable: false,
          enumerable: false,
          configurable: false,
        });
      } else {
        console.error(
          `can't set property ${name} on Object.\n it's found alredy`,
        );
      }
    }
  }
  private static replaceConsole() {
    //make console logging into MDev console
    const orginConsole = {
      log: console.log.bind(console),
      error: console.error.bind(console),
      info: console.info.bind(console),
      warn: console.warn.bind(console),
      assert: console.assert.bind(console),
      time: console.time.bind(console),
      timeEnd: console.timeEnd.bind(console),
    };
    console.log = (...data) => {
      window.green(...data);
      orginConsole.log(...data);
    };
    console.error = (...data) => {
      window.red(...data);
      orginConsole.error(...data);
    };
    console.info = (...data) => {
      window.blue(...data);
      orginConsole.info(...data);
    };
    console.warn = (...data) => {
      window.yellow(...data);
      orginConsole.warn(...data);
    };
    console.assert = (condition, ...data) => {
      window.test(condition, ...data);
      orginConsole.assert(condition, ...data);
    };
    console.time = (label = "time start") => {
      window.time(label);
      orginConsole.time(label);
    };
    console.timeEnd = (label = "time end") => {
      window.timeEnd(label);
      orginConsole.timeEnd(label);
    };
  }
}
