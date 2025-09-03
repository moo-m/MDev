export class WindowBindings {
methodNames: (
| "green"
| "red"
| "blue"
| "yellow"
| "test"
| "time"
| "timeEnd"
)[];
constructor(private mdev: any) {
this.methodNames = [
"green",
"red",
"blue",
"yellow",
"test",
"time",
"timeEnd"
];
}
public init() {
//usage [green](data)
this.setOnWindow();
//usage [data].green()
this.setOnObject();
}
private setOnWindow() {
//make console methods usable
//add method to global

for (const name of this.methodNames) {
if (window) {
window[name] = (...args: any[]) => {
(this.mdev as any)[name](...args);
};
}
(globalThis as any)[name] = (...args: any[]) => {
(this.mdev as any)[name](...args);
};
}
}
private setOnObject() {
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
configurable: false
});
} else {
console.error(
`can't set property ${name} on Object.\n it's found alredy`
);
}
}
}
}