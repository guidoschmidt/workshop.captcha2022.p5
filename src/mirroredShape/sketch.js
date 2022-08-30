const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },

  ["@seed.component"]: "slider",
  seed: 0,
};

let ui;
let gfx;

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  gfx = createGraphics(width / 2, height, WEBGL);
  noLoop();
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function draw() {
  randomSeed(settings.seed);
  clear();
  background(0);
  fill(255);

  gfx.background(128);
  gfx.fill(255, 0, 0);
  gfx.rect(0, 0, 300, 300);

  image(gfx, -width / 2, -height/ 2, width /2, height);
  image(gfx, width/2, -height/ 2, -width /2, height);
}
