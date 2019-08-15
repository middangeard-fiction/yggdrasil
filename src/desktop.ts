import { Window } from "./controls/window";
import { Dispatcher } from "./dispatcher";
import { AppEvent } from "./enums/enums";
import { App } from "./app";
import { Middangeard1Generator } from "./codegen/middangeard1/middangeard1Generator";
import { TadsGenerator } from "./codegen/tads/TadsGenerator";
import { Inform7Generator } from "./codegen/inform7/Inform7Generator";
import { Alan2Generator } from "./codegen/alan2/alan2Generator";
import { Alan3Generator } from "./codegen/alan3/alan3Generator";
import { QuestGenerator } from "./codegen/quest/questGenerator";

export enum FileType {
  Yggdrasil,
  Trizbort
}

export class Desktop {
  static openFile(paths: Array<string>, type?: FileType) {
    // Open the first path inside the paths array.
    astilectron.sendMessage(
      { name: "open_file", payload: paths[0] }, function (data: any) {
        switch (type) {
          default:
          case FileType.Yggdrasil:
            App.menuPanel.loadMap(data.payload);
            break;
          case FileType.Trizbort:
            App.menuPanel.importMap(data.payload);
            break;
        }
      }
    );
  }

  static promptQuit() {
    new Window('Exit Yggdrasil', 'You will lose any unsaved progress. Proceed?', () => {
    // OK
    astilectron.sendMessage({ name: "quit" });
    }, () => {
    // Cancel
    });
    }

  static initialize() {
    // Listen for incoming Astilectron messages.
    astilectron.onMessage(function (message: any) {
      switch (message.name) {
        case "prompt_quit":
          Desktop.promptQuit();
          break;
        case "new_map":
          App.menuPanel.actionNewMap();
          break;
        case "open_map":
          switch (message.payload) {
            case "yggdrasil":
              astilectron.showOpenDialog({
                properties: ['openFile'], title: "Open Yggdrasil Map", filters: [
                  { name: 'Yggdrasil Map', extensions: ['json'] }]
              }, function (paths) {
                if (paths != undefined) {
                  Desktop.openFile(paths);
                }
              });
              break;
            case "trizbort":
              astilectron.showOpenDialog({
                properties: ['openFile'], title: "Open Trizbort Map", filters: [
                  { name: 'Trizbort Map', extensions: ['trizbort'] }]
              }, function (paths) {
                if (paths != undefined) {
                  Desktop.openFile(paths, FileType.Trizbort);
                }
              });
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
          new Window('Load sample map', 'This will erase all editor contents. Proceed?', () => {
            // OK
            document.location.href = `index.html?map=${message.payload}`;
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
    });
  }
}