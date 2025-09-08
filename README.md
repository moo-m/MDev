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

app --> dock

conBtn([conBtn])
eleBtn([eleBtn])
netBtn([netBtn])

dock --> conBtn
dock --> eleBtn
dock --> netBtn

devtools([devtools])

conBtn --> |click| devtools
eleBtn --> |click| devtools
netBtn --> |click| devtools

conManager([conManager])
eleManager([eleManager])
netManager([netManager])

devtools --> conManager
devtools --> eleManager
devtools --> netManager

screen([screen])

conManager -. layout .-> screen
eleManager -. layout .-> screen
netManager -. layout .-> screen

screen -.->|console| browser[browser]
screen -.->|element| browser[browser]
screen -.->|network| browser[browser]

style app fill:gray,stroke:red
style browser fill:gray,stroke:red

```
# Console
```mermaid
sequenceDiagram
participant manager
participant store
participant format
participant layout
manager ->> store:giv me the logs
store ->>manager:{catagore,data}
manager ->> format:{catagore,data}
format ->>layout:container
layout ->> manager:fully layout
```