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

MDiv[MDiv]

Dock([dock])

Bind([bind log to windwo])

ConsoleBtn([console btn])
ElementBtn([element btn])
NetworkBtn([network btn])

DevTools([devtools])

ConsoleManager([console manager])
ElementManager([element manager])
NetworkManager([network manager])

Browser[browser]

MDiv ===> Dock

MDiv==>Bind

Dock --> ConsoleBtn
Dock --> ElementBtn
Dock --> NetworkBtn

ConsoleBtn -.-> |click| DevTools
ElementBtn -.-> |click| DevTools
NetworkBtn -.-> |click| DevTools

DevTools -.-> ConsoleManager
DevTools -.-> ElementManager
DevTools -.-> NetworkManager

ConsoleManager -. console window .-> Browser
ElementManager -. element window .-> Browser
NetworkManager -. network window .-> Browser

	linkStyle 12 color:#000000
```
# Console
```mermaid
sequenceDiagram
participant Devtools
participant Console
participant Store
participant Format
participant Layout

Devtools->>Console:giv me the content
Console ->> Store:giv me the logs
Store ->> Console:{catagore,data}
Console ->> Format:{catagore,data}
Format ->> Layout:container
Layout ->> Console:fully layout
Console ->>Devtools:container
Note over Devtools:add the container <br/>to the screen created <br/>then render on window
```