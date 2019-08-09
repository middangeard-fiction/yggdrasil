import { Window } from "./controls/window";
import { Dispatcher } from "./dispatcher";
import { AppEvent } from "./enums/enums";

export class Desktop {
  static initialize() {
    // Listen for incoming Astilectron messages.
    astilectron.onMessage(function (message: any) {
      switch (message.name) {
        // load_map loads a predefined map by name.
        case "load_map":
            new Window('Load sample map', 'This will erase all editor contents. Proceed?', () => {
              // OK
              document.location.href = `index.html?map=${message.payload}`;
              Dispatcher.notify(AppEvent.Load, null);
            }, () => {
              // Cancel
            });
          break;
      }
    });
  }
}