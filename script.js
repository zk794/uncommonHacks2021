
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 10;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];
let t = 0;
{
[color('#ff3366','#ff668c' ,'#ff7a9c'), color('#ff9eb6','#ffc2d1','#141b3e')]
 [color('#1bff0f', '#47ff3d', '#69ff61'), color('#94ff8f','#b6ffb3','#141b3e')] 
  [color('#1f51ff', '#3d67ff', '#577bff'), color('#7593ff','#94abff','#141b3e')]
   [color('#bd00ff','#c629ff','#ce47ff' ), color('#da75ff','#e59eff','#141b3e')] 
    [color('#defe48', '#e2fe67','#e6fe7b'), color('#ebfe94','#f2ffb8','#141b3e')] 
	[color('#ff3366','#ff668c' ,'#ff7a9c'), color('#ff9eb6','#ffc2d1','#c7f3ff')]
 [color('#1bff0f', '#47ff3d', '#69ff61'), color('#94ff8f','#b6ffb3','#c7f3ff')] 
  [color('#1f51ff', '#3d67ff', '#577bff'), color('#7593ff','#94abff','#c7f3ff')]
   [color('#bd00ff','#c629ff','#ce47ff' ), color('#da75ff','#e59eff','#c7f3ff')] 
    [color('#defe48', '#e2fe67','#e6fe7b'), color('#ebfe94','#f2ffb8','#c7f3ff')]
}
function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();
  noiseDetail(4, 0.6);
  frameRate(1);

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
