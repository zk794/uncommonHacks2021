
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 10;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];
//let t = 0;

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();
  noiseDetail(4, 0.6);
  frameRate(2);

  background(220);

  // initialize array of pixels
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = noise(r*0.05, c*0.05) * 255;
      pixelArr.push(i);
    }
  }
}

function draw() {
  //background(220);
  // for (let r = 0; r < numRows; r++) {
  //   for (let c = 0; c < numCols; c++) {
  //     pixelArr[r][c] = noise(t + r*0.05, t +c*0.05) * 255;
  //   }
  // }
  drawPixelArr();
  //t += 5;
}

function changePixel(xpos, ypos, value) {

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
