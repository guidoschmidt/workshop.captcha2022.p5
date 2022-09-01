let ui;
let mic;
let fft;
let spectrum;

const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
  },
  seed: 0,
  ["@spectrumSize.step"]: 2,
  spectrumSize: 16,

  maxIteration: 3,

  startAudio: () => {
    mic = new p5.AudioIn((err) => {
      console.error(`Could not create audio in: `, err);
    });
    fft = new p5.FFT(0.9, 16);
    mic.start();
    fft.setInput(mic);
  },

  stopAudio: () => {
    mic.stop();
  },
};

let images = []

function preload() {
  for (let i = 0; i < 22; i++) {
    images.push(loadImage(`/guido/${i}.jpg`))
  }
  TexturedShape.preload();
}

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function drawStory(iteration, x, y, w, h) {
  const { maxIteration, spectrumSize } = settings;
  if (iteration > maxIteration) {
    let audioVal = 1;
    if (spectrum) {
      audioVal = map(spectrum[round(random(0, spectrumSize))], 0, 255, 0.1, 1);
    }
    push();
    noStroke();
    translate(x, y);
    fill(random(128, 255));
    triangle(0, 0, w, 0, w / 2, -h * audioVal);
    pop();
    return;
  }

  push();
  fill(random(128, 255))
  noStroke();
  translate(x, y);
  const shape = new TexturedShape();
  const imgIndex = round(random(0, images.length))
  shape.setTexture(images[imgIndex]);
  shape.fill(255);
  shape.vertex(w, 0);
  shape.vertex(w, -h);
  shape.vertex(0, -h);
  shape.vertex(0, 0);
  shape.draw();
  pop();

  // Recursion
  let audioVal = 1;
  if (spectrum) {
    audioVal = map(spectrum[round(random(0, spectrumSize))], 0, 255, 0.1, 1);
  }
  drawStory(iteration + 1, x, y - h, w, random(10, 200) * audioVal);
}

function draw() {
  const { spectrumSize } = settings;

  randomSeed(settings.seed);
  clear();
  background(0);
  fill(255);

  push();
  translate(0, height / 2);
  for (let i = 0; i < spectrumSize; i++) {
    let x = map(i, 0, spectrumSize, -width / 2, width / 2);
    let stepWidth = width / spectrumSize;
    let audioVal = 1;
    if (spectrum) {
      audioVal = map(spectrum[round(random(0, spectrumSize))], 0, 255, 0, 5);
    }
    drawStory(0, x, 0, stepWidth, audioVal * 100);
  }
  pop();

  if (mic && fft) {
    spectrum = fft.analyze();
  }
}
