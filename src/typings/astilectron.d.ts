declare class astilectron {
    static showOpenDialog(options: object, arg1: (paths: Array<string>) => void): string;
    static onMessage(fn: Function): any;
    static sendMessage(name: string | object, fn?: Function): any;
}
