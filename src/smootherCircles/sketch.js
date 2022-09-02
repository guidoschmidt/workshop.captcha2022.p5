const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
  },
  fullscreen: () => {
    document.querySelector("canvas").requestFullscreen();
  },
};

let ui;

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  noLoop();
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function draw() {
  randomSeed(settings.seed);
  clear();
  background(0);
  fill(255);
  ellipse(-200, 0, 400, 400);
  const detail = 100;
  ellipse(200, 0, 400, 400, detail);
}
