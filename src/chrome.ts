import { Window } from "./controls/window";
import { App } from "./app";
import { Dispatcher } from "./dispatcher";
import { AppEvent } from "./enums/enums";
import { HobbitMap } from "./maps/hobbitMap";
import { MapJSON } from "./io/mapJSON";
import { CastleofdoomMap } from "./maps/castleofdoomMap";
import { Middangeard1Generator, TadsGenerator, Inform7Generator, Alan2Generator, Alan3Generator, QuestGenerator } from "./codegen/CodeGeneration";

export class Chrome {
  static promptQuit() {
    new Window(App.i18n.getMessage("app_quit_title"), App.i18n.getMessage("app_quit_text"), () => {
      // OK
      chrome.runtime.sendMessage({ name: "quit" });
    }, () => {
      // Cancel
    });
  }

  static maximize() {  
    // @ts-ignore
    var win = chrome.app.window.current();
    
    if (!win.isMaximized()) {
      win.maximize();
    } else {
      win.restore();
    }
  }

  static minimize() {
    // @ts-ignore
    var win = chrome.app.window.current();
    win.minimize();
  }

  static initialize() {
    let quitButton: any = document.getElementById("top-titlebar-close-button");
    let maximizeButton: any = document.getElementById("top-titlebar-maximize-button");
    let minimizeButton: any = document.getElementById("top-titlebar-minimize-button");
    quitButton.onclick = this.promptQuit;
    maximizeButton.onclick = this.maximize;
    minimizeButton.onclick = this.minimize;

    chrome.runtime.onMessage.addListener(
      function (message, sender, sendResponse) {
        switch (message.name) {
          case "prompt_quit":
            Chrome.promptQuit();
            break;
          case "new_map":
            App.menuPanel.actionNewMap();
            break;
          case "open_map":
            switch (message.payload) {
              case "yggdrasil":
                App.menuPanel.actionLoadMap();
                break;
              case "trizbort":
                App.menuPanel.actionImportMap();
                break;
            }
            break;
          case "save_map":
            App.menuPanel.actionSaveMap();
            break;
          case "export_map":
            switch (message.payload) {
              case "image":
                App.menuPanel.actionExport();
                break;
              case "middangeard1":
                App.menuPanel.actionGenerateCode(new Middangeard1Generator(App.map), 'go');
                break;
              case "tads":
                App.menuPanel.actionGenerateCode(new TadsGenerator(App.map), 't3');
                break;
              case "i7":
                App.menuPanel.actionGenerateCode(new Inform7Generator(App.map), 'ni')
                break;
              case "a2":
                App.menuPanel.actionGenerateCode(new Alan2Generator(App.map), 'a2c')
                break;
              case "a3":
                App.menuPanel.actionGenerateCode(new Alan3Generator(App.map), 'a3c')
                break;
              case "quest":
                App.menuPanel.actionGenerateCode(new QuestGenerator(App.map), 'aslx')
                break;
            }
            break;
          // load_map loads a predefined map by name.
          case "load_map":
            new Window(App.i18n.getMessage("app_load_map_title"), App.i18n.getMessage("app_load_map_text"), () => {
              // OK
              // window.open(`index.html?map=${message.payload}`);
              // document.location.href = `index.html?map=${message.payload}`;

              window.location.replace(`index.html?map=${message.payload}`)

              // let map = null
              // switch (message.payload) {
              //   case "hobbit":
              //     map = HobbitMap;
              //     break;
              //   case "castle":
              //     map = CastleofdoomMap;
              //     break; 
              // }
              // if(map != null) {
              //   App.map = MapJSON.load(map.json);
              // }
              Dispatcher.notify(AppEvent.Load, null);
            }, () => {
              // Cancel
            });
            break;
          case "open_settings":
            switch (message.payload) {
              case "map":
                App.menuPanel.actionMapSettings();
                break;
              case "render":
                App.menuPanel.actionRenderSettings();
                break;
            }
            break;
        }
      })
  }
}
