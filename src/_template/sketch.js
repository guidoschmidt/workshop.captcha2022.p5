const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
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
  const w = round(random(100, 500));
  const h = round(random(100, 500));
  rect(-w / 2, -h / 2, w, h);
}
