![Activity Level](https://img.shields.io/badge/status-active-brightgreen.svg?style=flat-square)
[![](https://anima-os.github.io/stabl-badges/unstable.svg)](https://github.com/Anima-OS/stabl-badges "Unstable: The API is in the process of settling, but has not yet had sufficient real-world testing to be considered stable. Backwards-compatibility will be maintained if reasonable. If we do have to make backwards-incompatible changes, we will not guarantee the module will go through the formal deprecation process.")

![](logo.svg)

# Yggdrasil

**Yggdrasil** is a JavaScript implementation of [Trizbort](http://www.trizbort.com), the adventure game mapping and code generation software. It aims to provide all Trizbort features in the browser, so that no download is required to create and share Trizbort maps,and generate code for several adventure design systems.

![Drawing a map in Yggdrasil](http://www.trizbort.io/assets/map.png)

## Code generation

At the moment, Yggdrasil supports code generation for the following design systems:

* Alan 2
* Alan 3
* Inform 7
* Quest
* TADS 3

Code generation for Hugo and ZIL may be added in the future.

## Contributing

Yggdrasil is written in TypeScript using the [JAMstack](https://jamstack.org/). There is no server back-end. It is simple to get it to run locally so you can hack on it. To do so:

* Install [Node.js](https://nodejs.org/). It will come with [npm](https://www.npmjs.com/), the Node.js package manager.
* Fork the project to a local directory.
* Run `npm install` to install all dependencies. This includes TypeScript, [Grunt](https://gruntjs.com/), Handlebars and Express.
* Build the project by running `grunt build`. 
* Run `grunt watch`. This process will rebuild parts of the project whenever you make a change.
* Start an Express development server.
* Open `index.html` in your browser.
