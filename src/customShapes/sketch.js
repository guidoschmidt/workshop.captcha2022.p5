const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },
  seed: 0,
  ["@w.component"]: "slider",
  w: 100,
  ["@h.component"]: "slider",
  h: 100,

  pointCount: 50,

  noiseSettings: {
    ["@noiseScale.component"]: "slider",
    noiseScale: 30,
    noiseHeight: 200,
  },
};

let ui;

function setup() {
  createCanvas(600, 600, WEBGL);
  setAttributes("antialias", true);
  //noLoop();
  ui = new P5Gui();
  ui.build("UI", settings);
}

function draw() {
  randomSeed(settings.seed);
  noiseSeed(settings.seed);

  clear();
  background(0);
  fill(255);
  noStroke();
  //strokeWeight(1);

  //rotate(radians(90));
  // Short
  const {
    w,
    h,
    pointCount,
    noiseSettings: { noiseHeight, noiseScale },
  } = settings;
  const rectangleWidth = (w / 100) * 400;
  const rectangleHeight = (h / 100) * 200;
  const startX = -rectangleWidth / 2;

  beginShape(TRIANGLE_STRIP);
  vertex(startX, rectangleHeight);
  for (let i = 0; i < pointCount; i++) {
    const i0 = i / pointCount;
    const y = -noise(i * map(noiseScale, 0, 100, -0.1, 0.1)) * noiseHeight;
    const vertexStep = i0 * rectangleWidth;
    vertex(startX + vertexStep, y);
    vertex(startX + vertexStep, rectangleHeight);
  }
  endShape();
}
