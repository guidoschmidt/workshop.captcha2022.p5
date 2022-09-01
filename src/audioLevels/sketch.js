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

let images = [];

function preload() {
  for (let i = 0; i < 22; i++) {
    images.push(loadImage(`/guido/${i}.jpg`));
  }
  TexturedShape.preload();
}

function setup() {
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function draw() {
  const { spectrumSize } = settings;

  randomSeed(settings.seed);
  clear();
  background(0);
  fill(255);

  scale(0.8);
  translate(-width / 2, height / 2);
  let audioVal = 1;
  fill(200);
  const step = width / spectrumSize;
  for (let i = 0; i < spectrumSize; i++) {
    if (spectrum) {
      audioVal = map(spectrum[i], 0, 255, 0, 5);
    }
    rect(i * step, 0, step, -100 * audioVal);
  }

  if (mic && fft) {
    spectrum = fft.analyze();
  }
}