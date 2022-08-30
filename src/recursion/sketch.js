const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },

  seed: 0,
  maxRecursion: 5,
  minWidth: 100,

  ["@maxWidth.component"]: "slider",
  maxWidth: 100,

  ["@colorA.component"]: "color",
  colorA: "#ff0000",
  ["@colorB.component"]: "color",
  colorB: "#00ff00",
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
  console.log("Rekursion", iteration);

  // Abbruchbedingung
  if (iteration > settings.maxRecursion) {
    return;
  }

  // maxRecursion: 5
  // iteration: 0, 1, 2, 3, 4, 5
  // -> map y from [0, 5] to [0, 1]
  const t = iteration / settings.maxRecursion;

  // Linear interpolation of width
  const w = lerp(settings.minWidth, settings.maxWidth / 100 * 1000, t);
  const h = 100;
  const y = t * height;

  // Linear interpolation of color
  const c = lerpColor(color(settings.colorA), 
                      color(settings.colorB), 
                      t);

  fill(c);
  rect(-w / 2, y - height / 2, w, h);

  // Eigtl. Rekursion
  recurse(iteration + 1); 
}

function draw() {
  randomSeed(settings.seed);
  clear();
  background(0);
  fill(255);
  noStroke();
  recurse(0);
}
