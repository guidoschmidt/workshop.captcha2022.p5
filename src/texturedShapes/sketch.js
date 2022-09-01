const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, "png");
  },
  ["@backgroundColor.component"]: "color",
  backgroundColor: "#af1800",
  rectangleSeed: 0,
  maxRecursion: 30,
  ["@minWidth.component"]: "slider",
  ["@minWidth.min"]: 0,
  ["@minWidth.max"]: 1000,
  minWidth: 50,
  ["@maxWidth.component"]: "slider",
  ["@maxWidth.min"]: 0,
  ["@maxWidth.max"]: 1000,
  maxWidth: 350,
  ["@colorA.component"]: "color",
  colorA: "#ff4920",
  ["@colorB.component"]: "color",
  colorB: "#204dff",
};

let ui;
let images = [];

function preload() {
  images.push(loadImage("/textures/seamless/16.webp"));
  images.push(loadImage("/textures/seamless/17.webp"));
  images.push(loadImage("/textures/seamless/28.webp"));
  images.push(loadImage("/textures/seamless/38.webp"));
  images.push(loadImage("/textures/seamless/43.webp"));
  images.push(loadImage("/textures/seamless/44.webp"));
  TexturedShape.preload();
}

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  ui = new P5Gui();
  ui.build("Textured Shapes", settings);
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
  const randomWidth = +random(-minWidth, maxWidth);
  const w = round(lerp(minWidth, maxWidth, sin(t * PI))) + randomWidth;
  const h = height / settings.maxRecursion;
  const y = t * height;
  const x = -w / 2;

  // Linear interpolation of color
  const c = lerpColor(
    color(settings.colorA),
    color(settings.colorB),
    t + random(-0.5, 0.5)
  );

  push();
  //rotate(radians(iteration * 10))
  translate(0, -height / 2);
  let shape = new TexturedShape();
  shape.setAngle(radians(random(-180, 180)));
  shape.fill(c);
  const imageIndex = round(random(0, images.length - 1));
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
  randomSeed(settings.rectangleSeed + frameCount / 60);

  clear();
  background(settings.backgroundColor);
  fill(255);
  noStroke();
  recurse(0);
}
