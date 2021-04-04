
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 10;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];
let t = 0;
let colorArr =
[[345, 100, 60], [345, 100, 70], [345, 100, 74], [345, 100, 81], [345, 100, 88],[100, 100, 100, 0]], // reds
[[117, 100, 53], [117, 100, 62], [117, 100, 69], [117, 100, 78], [117, 100, 85], [100, 100, 100, 0]], // greens
[[227, 100, 56], [227, 100, 62], [227, 100, 67], [227, 100, 73], [227, 100, 79], [100, 100, 100, 0]], // purples
[[284, 100, 50], [284, 100, 58], [284, 100, 64], [284, 100, 73] ,[284, 100, 81],[100, 100, 100, 0]],//blues
[[71, 100, 64], [71, 100, 70], [71, 100, 74], [71, 100, 79], [71, 100, 86], [100, 100, 100, 0]],//yellows
 ]
function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();
  noiseDetail(4, 0.6);
  frameRate(1);
  colorMode(HSL, 360, 100, 100);

  background(220);

  // initialize array of pixels
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = transformNoise(noise(r*0.05, c*0.05, t)) * 255;
      pixelArr.push(i);
    }
  }
}

function draw() {
  background(220);
  drawPixelArr();
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      pixelArr[r*numCols + c] = transformNoise(noise(t + r*0.05, c*0.05, t)) * 255;
    }
  }
  t += 0.04;
}

function transformNoise(n) {
  if (n < 0.5) {
    return 0;
  } else if (n < 0.6) {
    return 0.2;
  } else if (n < 0.7) {
    return 0.4;
  } else if (n < 0.8) {
    return 0.5;
  } else if (n < 0.9) {
    return 0.8;
  } else {
    return 1;
  }
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
