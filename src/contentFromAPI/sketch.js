const settings = {
  ["@change"]: () => draw(),
  download: () => {
    const name = Date.now();
    ui.downloadConfiguration(name);
    saveCanvas(`${name}`, ".png");
  },
  fontSize: 30,
  padding: 10,
};

let ui;
let json;
let font;
let img;

function preload() {
  // Load data from Wikipedia
  // https://en.wikipedia.org/api/rest_v1/#/Page%20content/get_page_random__format_
  //
  // Just open the URL in your browser to get an idea of the datas sturcture
  // or even use an API brwoser like https://insomnia.rest/download
  const url = "https://en.wikipedia.org/api/rest_v1/page/random/summary";
  loadJSON(url, "json", (result) => {
    json = result;
    img = loadImage(json.originalimage.source);
  });
  // Load a font from `public` folder
  font = loadFont("/fonts/FuturaBold.otf");
}

function setup() {
  // Setup the canvas
  createCanvas(800, 800, WEBGL);
  setAttributes("antialias", true);
  noLoop();
  // Setup UI
  ui = new P5Gui();
  ui.build("TEMPLATE", settings);
}

function draw() {
  const { fontSize, padding } = settings;
  // Font settings
  textSize(fontSize);
  textFont(font);
  textAlign(CENTER);
  // Clear the background
  clear();
  background(0);
  // Draw the image from wikipedia
  image(img, -width / 2, -height / 2, width, height);
  // Draw the text title from wikipedia
  noStroke();
  fill(0);
  const bbox = font.textBounds(json.title, 0, 0, fontSize);
  rect(
    bbox.x - padding,
    bbox.y - padding,
    bbox.w + 2 * padding,
    bbox.h + 2 * padding
  );
  fill(255);
  text(json.title, 0, 0);
}
