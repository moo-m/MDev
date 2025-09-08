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

App([MDiv])

Dock([dock])

App --> Dock

ConBtn([conBtn])
EleBtn([eleBtn])
NetBtn([netBtn])

Dock --> ConBtn
Dock --> EleBtn
Dock --> NetBtn

DevTools([devtools])

ConBtn --> |click| Devtools
EleBtn --> |click| Devtools
NetBtn --> |click| Devtools

ConManager([con manager])
EleManager([ele manager])
NetManager([net manager])

Devtools --> ConManager
Devtools --> EleManager
Devtools --> NetManager

Browser[browser]

ConManager -. console window .-> Browser
EleManager -. element window .-> Browser
NetManager -. network window .-> Browser

style App fill:gray,stoke:red
style Browser fill:gray,stroke:red

```
# Console
```mermaid
sequenceDiagram
participant Manager
participant Mtore
participant Format
participant Layout
Manager ->> Store:giv me the logs
Store ->> Manager:{catagore,data}
Manager ->> Format:{catagore,data}
Format ->> Layout:container
Layout ->> Manager:fully layout
```