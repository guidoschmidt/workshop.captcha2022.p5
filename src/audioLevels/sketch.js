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
    fft = new p5.FFT(0.9, settings.spectrumSize);
    mic.start();
    fft.setInput(mic);
  },

  stopAudio: () => {
    mic.stop();
  },
};

let images = [];

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

  if (mic && fft) {
    spectrum = fft.analyze();
  }

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

  
}
