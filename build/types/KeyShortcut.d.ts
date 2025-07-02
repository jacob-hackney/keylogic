export declare class KeyShortcut {
    #private;
    constructor(callback: (event: KeyboardEvent) => void, ...keys: string[]);
    bound: boolean;
    bind(): void;
    unbind(): void;
}
