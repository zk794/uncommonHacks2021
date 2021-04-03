
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 20;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();

  background(220);

  // initialize array of pixels
  let counter = 0;
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = 0;
      if (counter % 3 == 0) {
        i = 255;
      } else if (counter % 3 == 1) {
        i = 100;
      }
      pixelArr.push(i);
      counter = counter + 1;
    }
  }
}

function draw() {
  pixelArr[4*numCols + 2] = 50;
  drawPixelArr();
}

function drawPixelArr() {
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      fill(color(pixelArr[r*numCols + c]));
      // strokeWeight(1); //uncomment to see pixel outlines
      // stroke('red');
      rect(r*rectSide, c*rectSide, rectSide, rectSide);
      console.log(r+", "+c+": "+pixelArr[r*numCols + c]);
    }
  }
}
