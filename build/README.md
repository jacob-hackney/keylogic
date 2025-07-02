# keylogic

A frontend JavaScript package for managing keyboard shortcuts/events.

## 📦 Installation

```sh
npm install keylogic --save
```

## 🚀 Usage

### Creating a keyboard shortcut:

`createKeyShortcut(callback, ...keys)`

```js
// Being a default export, you can name this function whatever you want.
import createKeyShortcut from "keylogic";

// The first argument is a callback function for when the shortcut is pressed, and the rest define the keybinds.
const myShortcut = createKeyShortcut(
  (event) => {
    /* Your callback */
  },
  "control",
  "alt",
  "a"
);

// To unbind the shortcut, simply call:
myShortcut.unbind();

// To re-bind it later:
myShortcut.bind();
```

⚠️ When calling `createKeyShortcut`, always use the **key name**(event.key), not the key code or any other identifier.

### 🗝️ Supported Key Names

- **Letters:** `a`-`z`

- **Numbers:** `0`-`9`

- **Modifier keys:** `control`, `alt`, `shift`, `meta` (Windows key, Command key, Chromebook search key)

- **Other common keys:**

  - `capslock`

  - `tab`

  - `enter`

  - `escape`

  - `backspace`

  - `arrowup`, `arrowdown`, `arrowleft`, `arrowright`

## Credits

Everything by **Jacob Hackney**.
