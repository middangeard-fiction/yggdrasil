declare class astilectron {
    static onMessage(fn: Function): any;
    static sendMessage(name: string, fn: Function): any;
}
