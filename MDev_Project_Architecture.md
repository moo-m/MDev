# MDev — Project Architecture & Communication Documentation

## 1. Project Overview

**MDev** is a browser-based developer-tools system implemented in TypeScript and rendered directly with the DOM API.

The project currently provides:

- A floating Dock.
- A Console tool.
- An Elements/DOM inspection tool.
- Independent movable and resizable windows.
- Console value formatting for primitives, arrays, and objects.
- A logging API exposed through `window` and `globalThis`.
- A DOM Abstract Data Tree (ADT).
- A `WeakMap`-based linker between real DOM nodes and their ADT structures.
- A `MutationObserver` pipeline for tracking DOM changes.
- A Shadow DOM host used to isolate MDev's UI.
- A shared Store for application state.

The main architectural idea is:

```text
Page DOM
   │
   ▼
ADT
   │
   ▼
Store / WeakMap
   │
   ├──────────────► Elements Formatter ─────► Elements UI
   │
   └──────────────► Mutation Trackers ──────► UI updates

MDev
 │
 ├── Dock
 │    ├── Console App
 │    └── Elements App
 │
 ├── Screen System
 │    ├── Move
 │    ├── Resize
 │    └── Close
 │
 └── Shadow DOM Host
```

---

# 2. Source Tree

The relevant source tree is:

```text
src/
│
├── dock/
│   ├── main.ts
│   └── apps/
│       ├── prototype.ts
│       ├── console.ts
│       └── elements.ts
│
├── window/
│   ├── main.ts
│   │
│   ├── console/
│   │   ├── main.ts
│   │   ├── layout/
│   │   │   ├── main.ts
│   │   │   ├── mainL.ts
│   │   │   └── nav.ts
│   │   ├── log/
│   │   │   ├── main.ts
│   │   │   ├── logger.ts
│   │   │   ├── bind.ts
│   │   │   └── utils/
│   │   │       └── getTime.ts
│   │   ├── formatters/
│   │   │   ├── main.ts
│   │   │   ├── primitives/
│   │   │   │   ├── main.ts
│   │   │   │   └── prototype.ts
│   │   │   ├── nunPrimitives/
│   │   │   │   ├── main.ts
│   │   │   │   ├── array.ts
│   │   │   │   ├── object.ts
│   │   │   │   └── handler/
│   │   │   │       └── separate.ts
│   │   │   └── utils/
│   │   │       └── getType.ts
│   │   └── store/
│   │       └── main.ts
│   │
│   ├── elements/
│   │   ├── main.ts
│   │   ├── ADT/
│   │   │   └── main.ts
│   │   ├── store/
│   │   │   └── main.ts
│   │   ├── formatter/
│   │   │   ├── main.ts
│   │   │   └── element/
│   │   │       ├── main.ts
│   │   │       ├── attributes.ts
│   │   │       ├── children.ts
│   │   │       ├── contents.ts
│   │   │       └── tags.ts
│   │   ├── layout/
│   │   │   ├── main.ts
│   │   │   └── mainL.ts
│   │   └── core/
│   │       ├── main.ts
│   │       └── changeTracker/
│   │           ├── main.ts
│   │           ├── elements.ts
│   │           ├── attributes.ts
│   │           └── content.ts
│   │
│   ├── screen/
│   │   ├── main.ts
│   │   ├── handler/
│   │   │   ├── moveHandler.ts
│   │   │   ├── resizeHandler.ts
│   │   │   └── closeHandler.ts
│   │   └── utils/
│   │       ├── getDistance.ts
│   │       └── rectUtils.ts
│   │
│   └── utils/
│       └── randomPosition.ts
│
├── style/
│   └── style.css
│
└── [application entry file containing MDiv]
```

---

# 3. Application Entry Point

The application starts with the `MDiv` class.

Conceptually:

```text
new MDiv().init()
       │
       ├── config()
       │
       ├── shadowHost()
       │
       ├── LogManager.binder()
       │
       └── new Dock().init()
```

## `MDiv.config()`

Creates the global MDev state:

```text
window.MDev
│
├── host
│
└── screens
    ├── console
    │   └── activate
    │
    └── elements
        └── activate
```

`activate` determines whether a particular application window already exists.

---

# 4. Shadow DOM Host

`MDiv.shadowHost()` creates a host element and attaches an open Shadow Root:

```text
document.body
    │
    └── MDev host
          │
          └── ShadowRoot
                │
                ├── style.css
                ├── Dock
                └── Screens
```

The purpose is to keep MDev's interface separated from the page's normal DOM and CSS.

The stylesheet is inserted into the Shadow Root using a `<link>` element.

---

# 5. Dock System

## `dock/main.ts`

`Dock` is responsible for creating the bottom application launcher.

It creates:

```text
#dev-dock-container
```

During initialization:

```text
Dock.init()
   │
   ├── append Dock to MDev host
   │
   ├── create Console
   │      └── setup()
   │
   └── create Elements
          └── setup()
```

The Dock does not implement the applications themselves.

It only renders application buttons and delegates their behavior.

---

# 6. Dock Application Prototype

## `dock/apps/prototype.ts`

`Proto` is the abstract base class for Dock applications.

It provides:

- The application element.
- The application name.
- Common `setup()` behavior.
- A click handler contract.

The architecture is:

```text
Proto
 │
 ├── Console
 │
 └── Elements
```

Each child class only needs to define its own `clickHandler()`.

---

# 7. Console Dock Application

## `dock/apps/console.ts`

The Console Dock button extends `Proto`.

When clicked:

```text
Console button
      │
      ▼
clickHandler()
      │
      ▼
DevTools.consoleApp()
```

`DevTools` then determines whether the Console window is already active.

---

# 8. Elements Dock Application

## `dock/apps/elements.ts`

The Elements Dock button works in the same way:

```text
Elements button
       │
       ▼
clickHandler()
       │
       ▼
DevTools.elementsApp()
```

---

# 9. DevTools Window Controller

## `window/main.ts`

`DevTools` is the main controller for opening and toggling applications.

It currently manages:

```text
DevTools
 │
 ├── consoleApp()
 │
 └── elementsApp()
```

Each method follows this pattern:

```text
Is screen active?
     │
 ├── YES ──► toggle existing screen
 │
 └── NO
      │
      ├── create application UI
      ├── mark screen active
      └── create Screen
```

---

# 10. Screen System

## `window/screen/main.ts`

`Screen` is the reusable window container.

It receives:

```text
name
layout
position
```

and creates:

```text
#dev-screen-{name}
```

The Screen then installs:

```text
MoveHandler
ResizeHandler
CloseHandler
```

and finally inserts the application layout into the window.

Architecture:

```text
Screen
 │
 ├── MoveHandler
 ├── ResizeHandler
 ├── CloseHandler
 │
 └── Application Layout
```

This allows Console and Elements to use the same window implementation.

---

# 11. Screen Movement

## `window/screen/handler/moveHandler.ts`

Movement uses touch events.

Two touches are used to calculate:

- Initial distance.
- Midpoint X.
- Midpoint Y.
- Window position.
- Window size.

The handler updates:

```text
--dev-top
--dev-left
--dev-width
--dev-height
```

after the interaction.

---

# 12. Screen Resize

## `window/screen/handler/resizeHandler.ts`

The resize handler creates:

```text
.dev-window-resize
```

Touch movement changes:

```text
width
height
```

The resulting dimensions are then stored in CSS custom properties.

---

# 13. Screen Close

## `window/screen/handler/closeHandler.ts`

The close button:

```text
×
```

adds a closing class.

After the animation ends, the window is removed.

It also changes:

```text
window.MDev.screens[name].activate
```

to `false`.

This allows the application to be opened again.

---

# 14. Random Window Position

## `window/utils/randomPosition.ts`

`randomPosition()` calculates a starting position based on the viewport.

It returns:

```text
{
    width,
    height,
    top,
    left
}
```

This position is passed to `Screen`.

---

# 15. Console Architecture

The Console consists of four major parts:

```text
ConsoleManager
 │
 ├── Store
 ├── Layout
 ├── Formatter
 └── Logger
```

---

# 16. ConsoleManager

## `window/console/main.ts`

`ConsoleManager` is the main Console controller.

It provides:

```text
init()
addMsg()
clear()
```

## Initialization

The flow is:

```text
ConsoleManager.init()
       │
       ├── create container
       │
       ├── read Store.data
       │
       ├── FormatManager.init(data)
       │
       ├── Layout.main(format)
       │
       ├── Layout.nav()
       │
       └── append UI
```

---

# 17. Console Store

## `window/console/store/main.ts`

The Console Store keeps Console logs.

Conceptually:

```text
Store.consoleInfo
│
├── container
├── main
└── logs[]
```

When a message is added:

```text
ConsoleManager.addMsg()
       │
       ▼
Store.data = data
       │
       ▼
logs.push(data)
```

If the Console is currently active, the new message is immediately formatted and appended.

---

# 18. Console Layout

The layout is split into:

```text
Layout
 │
 ├── Nav
 │
 └── MainL
```

`MainL` creates the main Console area and input.

The resulting structure is approximately:

```text
Console
│
├── Navigation
│
└── Main
    │
    ├── Messages
    │
    └── Input
```

---

# 19. Console Navigation

## `window/console/layout/nav.ts`

The navigation provides filters for:

```text
success
error
warn
info
test
time
all
```

The navigation uses event delegation.

When a filter is clicked, existing message wrappers are inspected and hidden/shown based on their status.

The clear button calls:

```text
window.clear()
```

which is supplied by the logging system.

---

# 20. Console Input

The Console input allows JavaScript expressions to be evaluated.

The flow is:

```text
User input
    │
    ▼
Submit
    │
    ├── add entered expression as success message
    │
    ▼
eval(expression)
    │
    ├── success
    │      └── add result
    │
    └── error
           └── add error message
```

This makes the Console act as an interactive JavaScript execution environment.

---

# 21. Console Logging System

The logging system consists of:

```text
LogManager
    │
    ▼
LogBind
    │
    ▼
Logger
    │
    ▼
ConsoleManager
```

---

# 22. Logger

## `window/console/log/logger.ts`

`Logger` provides:

```text
green()
red()
blue()
yellow()
test()
time()
timeEnd()
clear()
```

Each method converts its arguments into a Console message:

```text
Logger
   │
   ▼
ConsoleManager.addMsg()
```

---

# 23. LogBind

## `window/console/log/bind.ts`

`LogBind` exposes the logging methods globally.

It installs methods such as:

```text
window.green()
window.red()
window.blue()
window.yellow()
window.test()
window.time()
window.timeEnd()
window.clear()
```

It also installs corresponding functions on `globalThis`.

Additionally, the project can attach logging methods to `Object.prototype`.

The commented `replaceConsole()` implementation is designed to intercept native:

```text
console.log()
console.error()
console.info()
console.warn()
console.assert()
console.time()
console.timeEnd()
```

and redirect them into MDev.

---

# 24. Console Formatting Pipeline

## `window/console/formatters/main.ts`

`FormatManager` decides how a value should be rendered.

The flow is:

```text
value
 │
 ▼
FormatManager.redirect()
 │
 ├── Primitive
 │      └── PrimitivesManager
 │
 └── Non-primitive
        └── NunPrimitivesManager
```

The formatter returns DOM elements rather than strings.

---

# 25. Primitive Formatter

Primitive values include:

```text
Number
String
Boolean
Null
Undefined
```

`PrimitivesManager` identifies the type and creates a formatted `<span>` through `Prototype`.

Examples of generated classes:

```text
.dev-console-number
.dev-console-string
.dev-console-boolean
.dev-console-null
.dev-console-undefined
```

---

# 26. Object and Array Formatter

Non-primitive values are handled by:

```text
NunPrimitivesManager
```

It currently supports:

```text
Array
Object
```

Architecture:

```text
NunPrimitivesManager
 │
 ├── ArrayF
 │
 └── ObjectF
```

Both recursively call:

```text
FormatManager.redirect()
```

for their child values.

This allows nested structures such as:

```text
{
    user: {
        name: "Mahmod",
        roles: ["admin", "developer"]
    }
}
```

to be recursively formatted.

---

# 27. Separate Object/Array Window

Objects and arrays have a separator control.

When clicked:

```text
separateHandler()
      │
      ├── clone container
      ├── install click delegation
      ├── generate random position
      └── create Screen
```

Therefore a complex Console object can be opened in its own MDev window.

---

# 28. Elements System

The Elements application is based around:

```text
DOM
 │
 ▼
ADT
 │
 ▼
Store
 │
 ▼
Formatter
 │
 ▼
Layout
 │
 ▼
Screen
```

The main controller is:

```text
ElementsManager
```

---

# 29. ElementsManager

## `window/elements/main.ts`

The initialization flow is:

```text
ElementsManager.init()
       │
       ▼
new ADT().init()
       │
       ▼
new Formatter(treeStructure).format()
       │
       ▼
Layout.main(format)
       │
       ▼
Tracker.track()
       │
       ▼
return container
```

This means the Elements UI is built from a representation of the actual page DOM.

---

# 30. ADT — Abstract Data Tree

## `window/elements/ADT/main.ts`

The ADT converts DOM nodes into plain JavaScript structures.

A simplified element structure is:

```text
{
    name,
    attributes: {
        children,
        ref
    },
    children,
    content,
    ref
}
```

For example:

```text
<div class="container">
    hello
</div>
```

becomes conceptually:

```text
{
    name: "div",
    attributes: {
        children: {
            class: {
                value: "container",
                ref: null
            }
        }
    },
    children: [
        {
            name: "#text",
            content: "hello"
        }
    ]
}
```

---

# 31. ADT Recursion

`abstracting(node)` recursively processes:

```text
node
 │
 ├── name
 ├── attributes
 └── children
       │
       ├── child 1
       ├── child 2
       └── child 3
```

For text and comment nodes, the content is stored instead of normal attributes/children processing.

---

# 32. Elements Store

## `window/elements/store/main.ts`

The Elements Store contains two important pieces:

```text
linker: WeakMap
ADT: Record
```

The `WeakMap` connects:

```text
Real DOM Node
       │
       ▼
ADT Structure
```

For example:

```text
DOM <div>
    │
    ▼
WeakMap
    │
    ▼
{
    name: "div",
    ...
    ref: rendered element
}
```

This is one of the central mechanisms of the Elements system.

---

# 33. Why WeakMap Is Used

A `WeakMap` allows the application to associate data with DOM nodes without keeping those nodes strongly referenced solely by the map.

The intended relationship is:

```text
DOM node
   ⇅
ADT object
```

The ADT can therefore locate the corresponding structure whenever a MutationObserver reports a change.

---

# 34. Elements Formatter

The Elements formatter converts the ADT into MDev UI.

Architecture:

```text
Formatter
    │
    ▼
ElementCollector
    │
    ├── Attributes
    ├── Children
    ├── Content
    └── Tag
```

---

# 35. ElementCollector

## `window/elements/formatter/element/main.ts`

`ElementCollector` is the central recursive renderer.

For normal elements:

```text
ElementCollector
 │
 ├── Attributes
 ├── Children
 └── Tag
```

For content nodes:

```text
ElementCollector
      │
      └── Content
```

It also stores a reference to the generated MDev DOM element:

```text
elementStructure.ref = container
```

This reference is later used by the change trackers.

---

# 36. Attributes Formatter

## `attributes.ts`

`Attributes` converts an ADT attributes object into DOM elements.

For example:

```text
class="container"
id="main"
```

is rendered as separate key/value spans.

The generated container is stored in:

```text
attributes.ref
```

This allows `AttributeTracker` to update the displayed attribute later.

---

# 37. Children Formatter

## `children.ts`

`Children` recursively calls `ElementCollector` for every child.

The relationship is:

```text
Children
   │
   ├── ElementCollector(child 1)
   ├── ElementCollector(child 2)
   └── ElementCollector(child 3)
```

This produces the complete nested element tree.

---

# 38. Content Formatter

## `contents.ts`

`Content` handles:

```text
#text
#comment
#document-fragment
```

Text nodes are represented by spans.

Comments and fragments are represented as document fragments.

---

# 39. Tag Formatter

## `tags.ts`

`Tag` determines how an element should be rendered.

It distinguishes:

```text
Void elements
Inline elements
Normal elements
```

Examples of void elements:

```text
img
input
br
meta
link
```

Normal elements are rendered conceptually as:

```text
<div>
    children
</div>
```

Inline elements use the project's current inline representation.

---

# 40. Elements Layout

The Elements UI passes through:

```text
Layout.main()
      │
      ▼
MainL.render()
```

`MainL` wraps the formatted content in:

```text
#dev-elements-layout-main
```

The final application is then inserted into the Screen.

---

# 41. Elements Change Tracking

The Elements system uses:

```text
MutationObserver
```

to detect changes to the real page.

The observer tracks:

```text
attributes
childList
characterData
```

The architecture is:

```text
MutationObserver
       │
       ▼
Tracker
       │
       ├── attributes
       │      └── AttributeTracker
       │
       ├── childList
       │      └── ElementsTracker
       │
       └── characterData
              └── ContentTracker
```

---

# 42. AttributeTracker

## `changeTracker/attributes.ts`

When an attribute changes:

```text
DOM attribute changed
       │
       ▼
MutationObserver
       │
       ▼
AttributeTracker
       │
       ├── find ADT through Store.linker
       │
       ├── read new DOM value
       │
       ├── update ADT
       │
       └── update rendered attribute
```

If the attribute already exists, its value is updated.

If it does not exist, a new attribute structure is created and the attribute UI is rebuilt.

---

# 43. ElementsTracker

## `changeTracker/elements.ts`

This tracker handles:

```text
addedNodes
removedNodes
```

For added element nodes:

```text
new DOM node
     │
     ▼
ADT.abstracting()
     │
     ▼
ElementCollector
     │
     ▼
rendered MDev element
     │
     ▼
target.children.push()
```

For removed nodes:

```text
removed DOM node
      │
      ▼
Store.linkerGet()
      │
      ▼
remove ADT child
      │
      ▼
linkerDelete()
      │
      ▼
remove rendered UI
```

---

# 44. ContentTracker

## `changeTracker/content.ts`

This tracker is responsible for character-data mutations.

Its current implementation only logs the mutation:

```text
console.log(mutation)
```

The intended future architecture is:

```text
characterData mutation
       │
       ▼
Store.linkerGet(node)
       │
       ▼
update ADT.content
       │
       ▼
update rendered reference
```

---

# 45. Complete Elements Communication Flow

When the page initially loads:

```text
ElementsManager
      │
      ▼
ADT.init()
      │
      ▼
document.documentElement
      │
      ▼
recursive abstracting
      │
      ├── Store.linkerSet(DOM node, ADT node)
      │
      └── build complete ADT
      │
      ▼
Formatter
      │
      ▼
ElementCollector
      │
      ├── Tag
      ├── Attributes
      ├── Children
      └── Content
      │
      ▼
Elements Layout
      │
      ▼
Screen
```

After initialization:

```text
Real DOM mutation
      │
      ▼
MutationObserver
      │
      ▼
Tracker
      │
      ├── AttributeTracker
      ├── ElementsTracker
      └── ContentTracker
      │
      ▼
Store / ADT
      │
      ▼
Rendered Elements UI
```

---

# 46. CSS Architecture

## `src/style/style.css`

The stylesheet contains the visual layer for all MDev components.

Major sections include:

```text
Global page styles
Dock
Screen
Screen animations
Close button
Resize handle
Console
Console navigation
Console messages
Primitive values
Arrays
Objects
Console input
Elements
```

Important component selectors include:

```text
#dev-dock-container
[id^="dev-screen"]
.dev-window-close-btn
.dev-window-resize

#dev-console-container
#dev-console-layout-nav
#dev-console-layout-main

.dev-console-msg-wrapper
.dev-console-msg-success
.dev-console-msg-error
.dev-console-msg-info

.dev-console-array
.dev-console-object

#dev-elements-formated
#dev-elements-layout-main
.dev-element-wrapper
.dev-element-attributes
```

Because the UI is rendered inside the Shadow Root, these styles are intended to apply to MDev's internal UI without directly depending on the page's normal CSS.

---

# 47. Overall Communication Architecture

The project can be understood as several independent layers.

## Layer 1 — Bootstrap

```text
MDiv
```

Responsible for initialization and global configuration.

## Layer 2 — Application Launcher

```text
Dock
```

Responsible for launching tools.

## Layer 3 — Application Controller

```text
DevTools
```

Responsible for creating/toggling applications.

## Layer 4 — Window System

```text
Screen
MoveHandler
ResizeHandler
CloseHandler
```

Responsible for displaying applications as independent windows.

## Layer 5 — Applications

```text
ConsoleManager
ElementsManager
```

Responsible for application-specific behavior.

## Layer 6 — Data

Console:

```text
Console Store
```

Elements:

```text
Elements Store
ADT
WeakMap
```

## Layer 7 — Rendering

Console:

```text
FormatManager
```

Elements:

```text
Formatter
ElementCollector
Tag
Attributes
Children
Content
```

## Layer 8 — Reactivity

Elements:

```text
MutationObserver
Tracker
AttributeTracker
ElementsTracker
ContentTracker
```

---

# 48. Console Communication Diagram

```text
User
 │
 ├── Dock
 │     │
 │     ▼
 │   DevTools
 │     │
 │     ▼
 │   Screen
 │     │
 │     ▼
 │ ConsoleManager
 │
 ├── Console Input
 │      │
 │      ▼
 │    eval()
 │      │
 │      ▼
 │ ConsoleManager.addMsg()
 │
 └── Logger
        │
        ▼
   ConsoleManager
        │
        ▼
      Store
        │
        ▼
   FormatManager
        │
        ├── Primitive Formatter
        │
        └── Object/Array Formatter
        │
        ▼
       DOM
```

---

# 49. Elements Communication Diagram

```text
Page DOM
   │
   ▼
  ADT
   │
   ├── Store.linker
   │
   ▼
 Formatter
   │
   ▼
ElementCollector
   │
   ├── Tag
   ├── Attributes
   ├── Children
   └── Content
   │
   ▼
 Elements Layout
   │
   ▼
  Screen
```

Then, after initialization:

```text
Page DOM
   │
   │ mutation
   ▼
MutationObserver
   │
   ▼
Tracker
   │
   ├── AttributeTracker
   ├── ElementsTracker
   └── ContentTracker
   │
   ▼
Store / ADT
   │
   ▼
MDev Elements DOM
```

---

# 50. Screen Communication Diagram

Every application follows the same window pipeline:

```text
Dock
 │
 ▼
DevTools
 │
 ▼
ApplicationManager.init()
 │
 ▼
Application Container
 │
 ▼
randomPosition()
 │
 ▼
Screen
 │
 ├── MoveHandler
 ├── ResizeHandler
 └── CloseHandler
```

This makes the Screen layer independent from the actual application.

---

# 51. Important References Between Modules

| Module | Depends On | Responsibility |
|---|---|---|
| `MDiv` | Dock, LogManager | Bootstrap |
| `Dock` | Console, Elements | Application launcher |
| `Proto` | None | Dock abstraction |
| `Console` | Proto, DevTools | Console launcher |
| `Elements` | Proto, DevTools | Elements launcher |
| `DevTools` | ConsoleManager, ElementsManager, Screen | Application controller |
| `Screen` | Handlers | Window container |
| `ConsoleManager` | Store, Layout, FormatManager | Console lifecycle |
| `Logger` | ConsoleManager | Logging API |
| `LogBind` | Logger | Global bindings |
| `FormatManager` | Primitive/NunPrimitive managers | Value rendering |
| `ElementsManager` | ADT, Formatter, Layout, Tracker | Elements lifecycle |
| `ADT` | Elements Store | DOM abstraction |
| `Elements Store` | None | DOM ↔ ADT linking |
| `Formatter` | ElementCollector | Elements rendering |
| `ElementCollector` | Tag, Attributes, Children, Content | Recursive rendering |
| `Tracker` | Store + Trackers | Mutation routing |
| `AttributeTracker` | Store, Attributes | Attribute synchronization |
| `ElementsTracker` | Store, ADT, ElementCollector | Node synchronization |
| `ContentTracker` | Store | Character data synchronization |

---

# 52. Main Data Flows

## Application opening

```text
Dock
 → Proto
 → Console/Elements
 → DevTools
 → Manager.init()
 → Screen
 → MDev ShadowRoot
```

## Console logging

```text
window.green(...)
 → Logger.green()
 → ConsoleManager.addMsg()
 → Console Store
 → FormatManager
 → DOM
```

## DOM inspection

```text
ElementsManager
 → ADT
 → Elements Store
 → Formatter
 → Elements DOM
```

## DOM change

```text
DOM
 → MutationObserver
 → Tracker
 → Specific Tracker
 → Store/ADT
 → Rendered UI
```

---

# 53. Architectural Principles

The current project follows these major principles:

### Separation of concerns

Each module has a relatively narrow responsibility.

### Reusable infrastructure

The Screen system is shared by all applications.

### Recursive rendering

Both Console objects and DOM elements are rendered recursively.

### Data/UI separation

The Elements ADT represents the page structure separately from the rendered MDev UI.

### DOM synchronization

The WeakMap and MutationObserver form the synchronization layer between the inspected page and the MDev interface.

### Extensibility

New Dock applications can follow the same pattern:

```text
NewApp extends Proto
        │
        ▼
NewManager
        │
        ▼
Screen
```

---

# 54. Current Limitations

The current architecture is functional but still evolving.

Important areas that need further work include:

1. `ContentTracker` does not yet synchronize character-data changes.
2. Several parts of the code use `any`.
3. The MutationObserver currently routes mutations using `return`, which can prevent later mutations in the same callback from being processed.
4. Some UI components rebuild DOM sections instead of updating individual nodes.
5. Global modifications such as `Object.prototype` bindings should be used carefully.
6. The Console uses `eval()`, which is powerful but should be treated as an intentional developer-tool capability.
7. The Screen state is currently stored through `window.MDev.screens`.
8. The project would benefit from a centralized event system as it grows.

---

# 55. Recommended Mental Model

When working on MDev, think about the project as five connected systems:

```text
                    MDev
                     │
        ┌────────────┼────────────┐
        │            │            │
       Dock        Screens       Store
        │            │            │
        ▼            ▼            ▼
   Applications   UI Window    Application Data
        │
   ┌────┴────┐
   │         │
Console   Elements
   │         │
   │         ├── ADT
   │         ├── Formatter
   │         └── MutationObserver
   │
   ├── Logger
   ├── Formatter
   └── Console Store
```

The most important relationship is:

```text
Application
    │
    ▼
Screen
    │
    ▼
UI

Application
    │
    ▼
Store / Data
    │
    ▼
Formatter
    │
    ▼
UI

External change
    │
    ▼
Observer
    │
    ▼
Store / Data
    │
    ▼
UI
```

---

# 56. Summary

MDev is structured as a modular browser developer-tools environment.

Its core architecture is:

```text
MDiv
 │
 ├── Shadow DOM
 │
 ├── Global Configuration
 │
 ├── Logger Binding
 │
 └── Dock
      │
      ├── Console
      │     │
      │     ├── ConsoleManager
      │     ├── Console Store
      │     ├── Logger
      │     └── Formatters
      │
      └── Elements
            │
            ├── ADT
            ├── Elements Store
            ├── Formatter
            └── Mutation Tracker
```

Both applications are displayed through the same:

```text
Screen
 ├── Move
 ├── Resize
 └── Close
```

The Elements application has an additional synchronization architecture:

```text
DOM
 ↕
WeakMap
 ↕
ADT
 ↕
Mutation Trackers
 ↕
Rendered Elements UI
```

The Console has its own data/rendering architecture:

```text
Logger / Input
      ↓
ConsoleManager
      ↓
Console Store
      ↓
FormatManager
      ↓
Console UI
```

This separation gives MDev a foundation where additional developer tools such as Network, Sources, Storage, Performance, or Application panels can be added without replacing the existing Screen infrastructure.
