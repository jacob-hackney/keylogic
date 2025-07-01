export class KeyShortcut {
  #keydowns: Array<(event: KeyboardEvent) => void> = [];
  #keyups: Array<(event: KeyboardEvent) => void> = [];
  #pressedKeys: { [key: string]: boolean } = {};

  constructor(callback: (event: KeyboardEvent) => void, ...keys: string[]) {
    for (let key of keys) {
      key = key.toLowerCase();
      Object.defineProperty(this.#pressedKeys, key, false);
      this.#keydowns.push((event) => {
        if (event.key === key) {
          this.#pressedKeys[key] = true;
          let allPressed = false;
          for (let k of keys) {
            if (!this.#pressedKeys[k]) {
              allPressed = false;
              break;
            }
            allPressed = true;
          }
          if (allPressed) {
            callback(event);
          }
        }
      });
      this.#keyups.push((event) => {
        if (event.key === key) {
          this.#pressedKeys[key] = false;
        }
      });
    }
  }

  bound: boolean = false;
  bind(): void {
    if (this.bound) {
      console.warn("[keylogic] Shortcut is already bound.");
      return;
    }
    for (let listener of this.#keydowns) {
      document.addEventListener("keydown", listener);
    }
    for (let listener of this.#keyups) {
      document.addEventListener("keyup", listener);
    }
  }
  unbind(): void {
    if (!this.bound) {
      console.warn("[keylogic] Shortcut is already unbound.");
      return;
    }
    for (let listener of this.#keydowns) {
      document.removeEventListener("keydown", listener);
    }
    for (let listener of this.#keyups) {
      document.removeEventListener("keyup", listener);
    }
  }
}
