import { KeyShortcut } from "./KeyShortcut.js";
export default function createKeyShortcut(callback, ...keys) {
    const shortcut = new KeyShortcut(callback, ...keys);
    shortcut.bind();
    return shortcut;
}
