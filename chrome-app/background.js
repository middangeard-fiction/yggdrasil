var exporters = {
  tads: "TADS",
  i7: "Inform 7",
  a2: "Alan 2",
  a3: "Alan 3",
  quest: "Quest",
}

function setUpContextMenus() {
  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_new"),
    id: "new_map",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    type: "separator",
    id: "sep1",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_open"),
    id: "open_map",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_import"),
    id: "import_map",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sep2',
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_save"),
    id: "save_map",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_image"),
    id: "save_image",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_file_export"),
    id: "exportParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: "Middangeard 1",
    id: "middangeard1",
    parentId: "exportParent",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sepExport',
    parentId: "exportParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sep3',
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_maps"),
    id: "parent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: "The Hobbit",
    id: "hobbit",
    parentId: "parent",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    title: "Castle of Doom",
    id: "castle",
    parentId: "parent",
    contexts: ["all"],
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sep4',
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_settings"),
    id: "settingsParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_settings_map"),
    id: "settingsMap",
    parentId: "settingsParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_settings_render"),
    id: "settingsRender",
    parentId: "settingsParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sep5',
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_help"),
    id: "helpParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_help_about"),
    id: "helpAbout",
    parentId: "helpParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_help_changelog"),
    id: "helpChangelog",
    parentId: "helpParent",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    type: "separator",
    id: 'sep6',
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    title: chrome.i18n.getMessage("app_quit_title"),
    id: 'quitter',
    contexts: ['all']
  });

  for (let exporter in exporters) {
    chrome.contextMenus.create({
      title: exporters[exporter],
      id: exporter,
      parentId: "exportParent",
      contexts: ['all']
    })
  }
}

chrome.runtime.onInstalled.addListener(function () {
  // When the app gets installed, set up the context menus
  setUpContextMenus();
});

chrome.app.runtime.onLaunched.addListener(function () {
  chrome.app.window.create('index.html', {
    'id': 'main',
    'outerBounds': {
      'width': 700,
      'height': 700,
    },
    'frame': 'none'
  });
});

chrome.contextMenus.onClicked.addListener(function (itemData) {
  switch (itemData.menuItemId) {
    case "quitter":
      var test = chrome.app.window.getAll()

      chrome.runtime.sendMessage(
        { name: "prompt_quit" },
      );
      break;
    case "new_map":
      chrome.runtime.sendMessage(
        { name: "new_map" }
      );
      break;
    case "hobbit":
      chrome.runtime.sendMessage(
        { name: "load_map", payload: "hobbit" }
      );
      break;
    case "castle":
      chrome.runtime.sendMessage(
        { name: "load_map", payload: "castle" }
      );
      break;
    case "open_map":
      chrome.runtime.sendMessage(
        { name: "open_map", payload: "yggdrasil" }
      );
      break;
    case "import_map":
      chrome.runtime.sendMessage(
        { name: "open_map", payload: "trizbort" }
      );
      break;
    // Exporters
    case "middangeard1":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "middangeard1" }
      );
      break;
    case "tads":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "tads" }
      );
      break;
    case "i7":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "i7" }
      );
      break;
    case "a2":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "a2" }
      );
      break;
    case "a3":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "a3" }
      );
      break;
    case "quest":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "quest" }
      );
      break;
    //
    case "save_map":
      chrome.runtime.sendMessage(
        { name: "save_map" }
      );
      break;
    case "save_image":
      chrome.runtime.sendMessage(
        { name: "export_map", payload: "image" }
      );
      break;
    case "settingsMap":
      chrome.runtime.sendMessage(
        { name: "open_settings", payload: "map" }
      );
      break;
    case "settingsRender":
      chrome.runtime.sendMessage(
        { name: "open_settings", payload: "render" }
      );
      break;
  }
});

chrome.runtime.onMessage.addListener(
  function (message, sender, sendResponse) {
    switch (message.name) {
      case "quit":
        var windows = chrome.app.window.getAll();
        for (let win of windows) {
          win.close();
        }
        break;
    }
  });
