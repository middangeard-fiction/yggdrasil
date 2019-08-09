package main

import (
	"flag"

	"github.com/asticode/go-astilectron"
	"github.com/asticode/go-astilectron-bootstrap"
	"github.com/asticode/go-astilog"
	"github.com/pkg/errors"
)

var (
	AppName string
	BuiltAt string
	debug   = flag.Bool("d", false, "enables the debug mode")
	w       *astilectron.Window
)

func main() {
	// Init
	flag.Parse()
	astilog.FlagInit()

	// Run bootstrap
	astilog.Debugf("Running app built at %s", BuiltAt)
	if err := bootstrap.Run(bootstrap.Options{
		Asset:    Asset,
		AssetDir: AssetDir,
		AstilectronOptions: astilectron.Options{
			AppName:            AppName,
			AppIconDarwinPath:  "resources/icon.icns",
			AppIconDefaultPath: "resources/icon.png",
		},
		Debug: *debug,
		MenuOptions: []*astilectron.MenuItemOptions{{
			Label: astilectron.PtrStr("File"),
			SubMenu: []*astilectron.MenuItemOptions{
				{Role: astilectron.MenuItemRoleClose},
			},
		},
			{
				Label: astilectron.PtrStr("Edit"),
				SubMenu: []*astilectron.MenuItemOptions{
					{Role: astilectron.MenuItemRoleCopy},
					{Role: astilectron.MenuItemRolePaste},
				},
			},
			{
				Label: astilectron.PtrStr("Maps"),
				SubMenu: []*astilectron.MenuItemOptions{
					{
						Label: astilectron.PtrStr("Castle of Doom"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "load_map", "castleofdoom"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
					{
						Label: astilectron.PtrStr("Colossal Cave Adventure"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "load_map", "adventure"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
					{
						Label: astilectron.PtrStr("The Hitchhiker’s Guide to the Galaxy"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "load_map", "hhg"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
					{
						Label: astilectron.PtrStr("The Hobbit"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "load_map", "hobbit"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
					{
						Label: astilectron.PtrStr("Zork"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "load_map", "zork"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
				},
			},
			{
				Label: astilectron.PtrStr("Help"),
				SubMenu: []*astilectron.MenuItemOptions{
					{
						Label: astilectron.PtrStr("About"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "open_window", "about"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
					{
						Label: astilectron.PtrStr("Changelog"),
						OnClick: func(e astilectron.Event) (deleteListener bool) {
							if err := bootstrap.SendMessage(w, "open_window", "changelog"); err != nil {
								astilog.Error(errors.Wrap(err, "sending load_map event failed"))
							}
							return false
						},
					},
				},
			},
		},
		OnWait: func(_ *astilectron.Astilectron, ws []*astilectron.Window, _ *astilectron.Menu, _ *astilectron.Tray, _ *astilectron.Menu) error {
			w = ws[0]
			return nil
		},
		RestoreAssets: RestoreAssets,
		Windows: []*bootstrap.Window{{
			Homepage:       "index.html",
			MessageHandler: handleMessages,
			Options: &astilectron.WindowOptions{
				BackgroundColor: astilectron.PtrStr("#5cc070"),
				Center:          astilectron.PtrBool(true),
				Height:          astilectron.PtrInt(700),
				Width:           astilectron.PtrInt(700),
			},
		}},
	}); err != nil {
		astilog.Fatal(errors.Wrap(err, "running bootstrap failed"))
	}
}
