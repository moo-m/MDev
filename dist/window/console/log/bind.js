export class LogBind {
    constructor(mdev) {
        this.mdev = mdev;
        this.methodNames = [
            "green",
            "red",
            "blue",
            "yellow",
            "test",
            "time",
            "timeEnd",
        ];
        console.log("0-bind");
    }
    init() {
        //usage [green](data)
        this.setOnWindow();
        //usage [data].green()
        this.setOnObject();
    }
    setOnWindow() {
        //make console methods usable
        //add method to global
        for (const name of this.methodNames) {
            if (window) {
                window[name] = (...args) => {
                    this.mdev[name](...args);
                };
            }
            globalThis[name] = (...args) => {
                this.mdev[name](...args);
            };
        }
    }
    setOnObject() {
        const that = this;
        //add method to Object
        for (const name of this.methodNames) {
            if (!Object.hasOwnProperty(name)) {
                Object.defineProperty(Object.prototype, name, {
                    value: function () {
                        that.mdev[name](this);
                    },
                    writable: false,
                    enumerable: false,
                    configurable: false,
                });
            }
            else {
                console.error(`can't set property ${name} on Object.\n it's found alredy`);
            }
        }
    }
}
