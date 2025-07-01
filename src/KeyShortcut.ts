export class KeyShortcut {
  #keydowns: Array<(event: KeyboardEvent) => void> = [];
  #keyups: Array<(event: KeyboardEvent) => void> = [];
  #pressedKeys: { [key: string]: boolean } = {};

  constructor(callback: (event: KeyboardEvent) => void, ...keys: string[]) {
    for (let key of keys) {
      key = key.toLowerCase();
      Object.defineProperty(this.#pressedKeys, key, {
        value: false,
        writable: true,
      });
      this.#keydowns.push((event) => {
        if (event.key.toLowerCase() === key) {
          this.#pressedKeys[key] = true;
          let allPressed = true;
          for (let k of keys) {
            if (!this.#pressedKeys[k]) {
              allPressed = false;
              break;
            }
          }
          if (allPressed) {
            callback(event);
          }
        }
      });
      this.#keyups.push((event) => {
        if (event.key.toLowerCase() === key) {
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
    this.bound = true;
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
    this.bound = false;
  }
}
