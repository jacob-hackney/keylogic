import { KeyShortcut } from "./KeyShortcut.js";

export default function createKeyShortcut(
  callback: (event: KeyboardEvent) => void,
  ...keys: string[]
): KeyShortcut {
  const shortcut = new KeyShortcut(callback, ...keys);
  shortcut.bind();
  return shortcut;
}
