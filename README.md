# MDEV
###### **MDev** is a devtools for wibsit 
---
## fetures
* console priview
* elements preview
---
## usage
* install it locally by run 
    ```js
      npm install MDiv
    ```
---
* using cdl link and past it in your html code as a javascript script
    ```html
      <script src="https://npm/MDiv"></script>
    ```

---
#App Structure

```txt
src
├── App.ts
├── dock
│   ├── apps
│   │   ├── console.ts
│   │   └── element.ts
│   └── main.ts
├── style
│   └── style.css
├── types
│   ├── dock
│   │   ├── apps
│   │   │   ├── console.d.ts
│   │   │   └── element.d.ts
│   │   └── main.d.ts
│   ├── global.d.ts
│   └── window
│       ├── console
│       │   ├── main.d.ts
│       │   └── src
│       │       └── main.d.ts
│       └── main.d.ts
└── window
    ├── console
    │   ├── formatters
    │   │   ├── main.ts
    │   │   ├── nunPrimitives
    │   │   │   ├── array.ts
    │   │   │   ├── handler
    │   │   │   │   └── separate.ts
    │   │   │   ├── main.ts
    │   │   │   └── object.ts
    │   │   ├── primitives
    │   │   │   ├── boolean.ts
    │   │   │   ├── main.ts
    │   │   │   ├── null.ts
    │   │   │   ├── number.ts
    │   │   │   ├── string.ts
    │   │   │   └── undefined.ts
    │   │   └── utils
    │   │       └── getType.ts
    │   ├── layout
    │   │   └── main.ts
    │   ├── log
    │   │   ├── bind.ts
    │   │   ├── logger.ts
    │   │   └── main.ts
    │   ├── main.ts
    │   └── utils
    │       └── getTime.ts
    ├── element
    │   ├── main.ts
    │   └── src
    │       └── main.ts
    ├── main.ts
    ├── screen
    │   ├── handler
    │   │   ├── closeHandler.ts
    │   │   ├── moveHandler.ts
    │   │   └── resizeHandler.ts
    │   └── main.ts
    └── utils
        ├── randomPosition.ts
        └── rectUtils.ts
```

# App Flow

```mermaid
flowchart TB
app([App])
dock([dock])
dockBtn[console]
window([window])
app --> dock
dock --> dockBtn
dockBtn -->|click| window

```