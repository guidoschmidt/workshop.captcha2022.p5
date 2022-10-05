# [Intro to Generative Illustrations](https://captcha.guidoschmidt.cc/) with [p5.js](https://p5js.org/)

> Repository for the Workshop held 30.08. — 01.09. [@ Capctha 2022 Design
> Festival / Mannheim](https://captcha-mannheim.de/)

You can also checkout this [p5 web editor
collection](https://editor.p5js.org/guidoschmidt/collections/a1ImoKrB8), if you
prefer working with the online editor.

<div>
  <img width="30%" src="/screenshots/1664957810535.png">
  <img width="30%" src="/screenshots/1664957818079.png">
  <img width="30%" src="/screenshots/1664957869016.png">
</div>

---

### Project Structure

- `public` will contain all images, which we will be using (it's like the `data`
  folder of processing sketches or the `bin/data/` folder of openFramework apps)
- `src` contains all of our source code, with the following sub-directories:
    - `index.html` is just a plain HTML page to have a simple space for listing
      all of our sketches.
    - `p5` contains a copy of the p5js library, as well as a not yet released ui
      library for p5js.
    - `tools` contains the `TexturedShape` class its shader code, which we will
      be using during the workshop.
    - `scss` contains a bit of CSS/SCSS to give the overall project a bit of
      styling.
    - `_template` contains a minimal template sketch, which you can copy and
      rename to start with your own sketch, e.g.
      ```bash
      cd src/
      cp _template landscapes
      ```
      To see the copied sketch folder in the overview, you need to edit
      `src/index.html`!
      
      
---
### Getting Started

To run this project on your device, you will need to have
[node.js](https://nodejs.org) installed.

The project setup uses [parcel.js](https://parceljs.org) to provide hot-code
reloading. To install all the necesarry dependencies, use your favourite node.js
project manager, like [npm](https://nodejs.org/en/knowledge/getting-started/npm/what-is-npm/) or [yarn](https://yarnpkg.com/)

- `yarn install` or `npm install` to install necesarry tools and packages
- `yarn dev` or `npm run dev` to spin up the development server (start the project)

---
### Build Project 
To put the project with all its sketches on a web server, you have to build it first using
`npm run build` or `yarn build`. This will produce a `htdocs` folder, which can be served by a web server like [MAMPP](https://www.mamp.info/de).

During the workshop we were using a simple portable webserver, called [caddy](https://github.com/caddyserver/caddy). The [`start-server`](htdocs/start-server) command in `/htdocs` is simply that webserver executable/binary, but renamed to `start-server` for better comprehensability.

To run the project on another machine, e.g. on the Mac Minis of the University of Applied Sciences Mannheim:
- `npm run build` on your local machine (laptop, desktop). This will produce a bundled website in the `htdocs` folder
- You can move the `htdocs` folder to another web server or machine:
  - Put `htdocs` onto an USB stick
  - Copy the `htdocs` folder somewhere on the new machine, e.g. `Desktop/captcha/htdocs`
  - Use the terminal (shell) to move to that directory, e.g. `cd Desktop/captcha/htdocs`
  - Run `./start-server` (on older macs. If your target machine already runs a M1 machine, use `./start-server-m1-macs`)
  - The server should start and you can open [http://localhost:2015](http://localhost:2015) in a browser
