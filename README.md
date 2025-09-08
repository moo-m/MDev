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
participant LogMethods

Devtools->>Console:giv me your content
Console ->> Store:do you have any data

alt
Store->>Console:yes, take this
Console ->> Format:[data]
Note over Format:formating
Format ->> Layout:wrap this data
Layout ->> Console:layout
Console ->>Devtools:container

else

Store->>Console:no
Console->>Layout:giv me an empty layout
Layout ->> Console:empty layout
Console ->>Devtools:container

end

LogMethods->>Store:hey. new data
Note over Store:i will save it then<br/>send to Console
Store -->> Console: are you here 

alt

Console->>Store:yes
Store ->>Console:this for you
Console ->> Format:[data]
Note over Format:formating
Format ->> Console:pkg
Note over Console:i will handle it

else

Console->>Store:no
Store ->>Console:call me, i have data for you

end

Note over Devtools:add the container <br/>to the screen created <br/>then render on window

```