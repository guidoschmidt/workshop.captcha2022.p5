const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },
  ["@backgroundColor.component"]: "color",
  backgroundColor: "#202433",
  rectangleSeed: 0,
  textureSeed: 0,
  maxRecursion: 20,
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
let images = [];

function preload() {
  images.push(loadImage("/butterfly.webp"));
  images.push(loadImage("/coffee.webp"));
  images.push(loadImage("/terrazzo.webp"));
  TexturedShape.preload()
}

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
  if (iteration === 0) {
  }

  // maxRecursion: 5
  // iteration: 0, 1, 2, 3, 4, 5
  // -> map y from [0, 5] to [0, 1]
  const t = iteration / settings.maxRecursion;

  // Linear interpolation of width
  const { minWidth, maxWidth } = settings;
  const randomWidth = + random(-minWidth, maxWidth);
  const w =
    round(lerp(minWidth, maxWidth, sin(t * PI)))  + randomWidth;
  const h = height / settings.maxRecursion;
  const y = t * height;
  const x = -w / 2;

  // Linear interpolation of color
  const c = lerpColor(color(settings.colorA), color(settings.colorB), t);


  //randomSeed(settings.textureSeed);
  push();
  translate(0, -height/2);
  let shape = new TexturedShape();
  shape.fill(c);
  const imageIndex = round(noise(iteration * 100) * 2);
  console.log(imageIndex);
  const img = images[imageIndex];
  shape.setTexture(img);
  shape.vertex(x, y);
  shape.vertex(x + w, y);
  shape.vertex(x + w, y + h);
  shape.vertex(x, y + h);
  shape.draw();
  pop();

  // Eigtl. Rekursion
  recurse(iteration + 1);
}

function draw() {
  randomSeed(settings.rectangleSeed);
  noiseSeed(settings.textureSeed);

  clear();
  background(settings.backgroundColor);
  fill(255);
  noStroke();
  recurse(0);
}
