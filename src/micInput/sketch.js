let ui;
let mic;

const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
  },

  startAudio: () => {
    mic = new p5.AudioIn((err) => {
      console.error(`Could not create audio in: `, err)
    });
    mic.start();
  },
  
  stopAudio: () => {
    mic.stop();
  }
};

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
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
  if (mic) {
    rect(-w / 2, -h / 2, w, map(mic.getLevel(), 0, 1, 0, height));
  }
}
