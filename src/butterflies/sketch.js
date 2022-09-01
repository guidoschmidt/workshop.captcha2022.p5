const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
  },
  seed: 0
};

let ui;
let gfx;
let images = []

function preload() {
  for (let i = 0; i < 22; i++) {
    images.push(loadImage(`/guido/${i}.jpg`))
  }
  TexturedShape.preload();
}

function setup() {
  createCanvas(800, 800, WEBGL);
  gfx = createGraphics(width / 2, height, WEBGL);
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
  gfx.background(128)

  const w = round(random(100, 500));
  const h = round(random(100, 500));

  const shape = new TexturedShape();
  const img = images[round(random(0, images.length - 1))];
  gfx.push();
  shape.setTexture(img);
  //shape.scaleTexture(round(random(256, 1024), round(random(256, 1024))))
  const wingWidth = random() * width / 2;
  shape.vertex(0, 0);
  shape.vertex(-wingWidth, -height / 2);
  shape.vertex(-wingWidth, -height / 2);
  shape.vertex(0, height / 2);
  shape.draw(gfx);
  gfx.pop();

  image(gfx, -width / 2, -height/2, width / 2, height);
  image(gfx, +width/2, -height/2, -width / 2, height);
}
