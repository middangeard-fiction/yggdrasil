package main

import (
	"bytes"
	"encoding/json"
	"github.com/asticode/go-astilectron"
	"github.com/asticode/go-astilectron-bootstrap"
	"io/ioutil"
)

func handleMessages(_ *astilectron.Window, m bootstrap.MessageIn) (payload interface{}, err error) {
	switch m.Name {
	case "quit":
		a.Quit()
		return
	case "open_file":
		var path string
		if len(m.Payload) > 0 {
			if err = json.Unmarshal(m.Payload, &path); err != nil {
				payload = err.Error()
				return
			}
			data, _ := ioutil.ReadFile(path)

			// Remove invalid unicode characters like \ufeff (byte order mark).
			trimmed := bytes.Trim(data, "\xef\xbb\xbf")

			// Return file contents to frontend.
			payload = string(trimmed)
			return
		}
	}
	return
}
