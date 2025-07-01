# keylogic

A frontend JavaScript package for managing keyboard shortcuts/events.

## Installation

```sh
npm install keylogic --save
```

## Usage

### Creating a keyboard shortcut:

`createKeyShortcut(callback, ...keys)`

```js
// Being a default export, you can name this function whatever you want.
import createKeyShortcut from "keylogic";

// The first argument is a callback for when the shortcut is pressed, and the rest are for defining the keybinds.
const myShortcut = createKeyShortcut(event => { ... }, "control", "alt", "a");

// To unbind the shortcut, simply call:
myShortcut.unbind();

// Don't worry, you can still re-bind it:
myShortcut.bind();
```

When calling the `createKeyShortcut` function, _always_ use the name of the key, not the key code or anything else.

## Credits

Everything by Jacob Hackney.
