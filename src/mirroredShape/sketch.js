const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },

  ["@controlPointX.component"]: "slider",
  ["@controlPointX.min"]: 0.0,
  ["@controlPointX.max"]: 1.0,
  ["@controlPointX.step"]: 0.01,
  controlPointX: 0.55,

  ["@controlPointY.component"]: "slider",
  ["@controlPointY.min"]: -1.0,
  ["@controlPointY.max"]: 1.0,
  ["@controlPointY.step"]: 0.01,
  controlPointY: 0.5,
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

  gfx.clear();
  gfx.background(0);
  gfx.noStroke();
  gfx.fill(255);
  gfx.beginShape();
  gfx.vertex(width / 4, -height / 2);
  
  // To draw a triangle, use 3 vertices
  //gfx.vertex(width/4 - 300, 0);
  //gfx.vertex(width/4, height / 2)

  // To draw a curve, use 1 vertex and 1 bezierVertex
  const { controlPointX, controlPointY } = settings;
  gfx.bezierVertex(
    width / 4,
    -height / 2,
    width / 4 - controlPointX * width,
    (controlPointY * height) / 2,
    width / 4,
    height / 2
  );

  gfx.endShape();

  image(gfx, -width / 2, -height / 2, width / 2, height);
  image(gfx, width / 2, -height / 2, -width / 2, height);
}
