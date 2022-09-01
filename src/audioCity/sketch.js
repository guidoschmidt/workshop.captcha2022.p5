let ui;
let mic;
let fft;
let spectrum;
let cnv;

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

  ["@backgroundColor.component"]: "color",
  backgroundColor: "#ffb420",

  startAudio: () => {
    mic = new p5.AudioIn((err) => {
      console.error(`Could not create audio in: `, err);
    });
    fft = new p5.FFT(0.9, settings.spectrumSize);
    mic.start();
    fft.setInput(mic);
  },

  stopAudio: () => {
    mic.stop();
  },

  fullscreen: () => {
    document.querySelector("canvas").requestFullscreen();
  },
};

let images = [];

function preload() {
  const start = round(random(0, 25));
  const end = round(random(start, 63));
  for (let i = start; i < end; i++) {
    images.push(loadImage(`/textures/not-seamless/${i}.webp`));
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
    fill(0);
    triangle(0, 0, w, 0, w / 2, -h * audioVal);
    pop();
    return;
  }

  push();
  fill(random(128, 255));
  noStroke();
  translate(x, y);
  const shape = new TexturedShape();
  const imgIndex = round(random(0, images.length));

  const fillColor = lerpColor(
    color(settings.backgroundColor),
    color(255),
    random(0, 1)
  );

  let audioVal = 1;
  if (spectrum) {
    audioVal = map(spectrum[round(random(0, spectrumSize))], 0, 255, 0.1, 1);
  }

  shape.setTexture(images[imgIndex]);
  const textureScale = 512 + audioVal * 512;
  shape.scaleTexture(textureScale, textureScale);
  shape.fill(fillColor);
  shape.vertex(w, 0);
  shape.vertex(w, -h);
  shape.vertex(0, -h);
  shape.vertex(0, 0);
  shape.draw();
  pop();

  // Recursion
  drawStory(iteration + 1, x, y - h, w, random(10, 200) * audioVal);
}

function draw() {
  const { spectrumSize, backgroundColor, seed } = settings;

  randomSeed(seed);
  clear();
  background(backgroundColor);
  fill(255);

  push();
  scale(0.8);
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
