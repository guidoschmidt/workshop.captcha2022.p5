const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },
  ["@backgroundColor.component"]: "color",
  backgroundColor: "#202433",
  seed: 0,
  maxRecursion: 40,
  ["@minWidth.component"]: "slider",
  ["@minWidth.min"]: 0,
  ["@minWidth.max"]: 1000,
  minWidth: 50,
  ["@maxWidth.component"]: "slider",
  ["@maxWidth.min"]: 0,
  ["@maxWidth.max"]: 1000,
  maxWidth: 350,
  ["@colorA.component"]: "color",
  colorA: "#ca8989",
  ["@colorB.component"]: "color",
  colorB: "#1e7b96",
};

let ui;

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  noLoop();
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function recurse(iteration) {
  // Abbruchbedingung
  if (iteration > settings.maxRecursion) {
    return;
  }

  // maxRecursion: 5
  // iteration: 0, 1, 2, 3, 4, 5
  // -> map y from [0, 5] to [0, 1]
  const t = iteration / settings.maxRecursion;

  // Linear interpolation of width
  const { minWidth, maxWidth } = settings;
  const w =
    round(lerp(minWidth, maxWidth, sin(t * PI))) + random(-minWidth, maxWidth);
  const h = height / settings.maxRecursion;
  const y = t * height;
  const x = -w / 2;

  // Linear interpolation of color
  const c = lerpColor(color(settings.colorA), color(settings.colorB), t);

  fill(c);
  rect(x, y - height / 2, w, h);

  // Eigtl. Rekursion
  recurse(iteration + 1);
}

function draw() {
  randomSeed(settings.seed);
  clear();
  background(settings.backgroundColor);
  fill(255);
  noStroke();
  recurse(0);
}
