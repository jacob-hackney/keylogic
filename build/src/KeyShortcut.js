export class KeyShortcut {
    #keydowns = [];
    #keyups = [];
    #pressedKeys = {};
    constructor(callback, ...keys) {
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
    bound = false;
    bind() {
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
    unbind() {
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
