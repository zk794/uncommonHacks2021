
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 20;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];
let cityArr1 = [];
let cityArr2 = [];
let t = 0;

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();
  frameRate(1);
  noiseDetail(4, 0.6);

  background(220);

  // initialize array of cloud/sky pixels
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = transformNoiseCloud(noise(r*0.05, c*0.05, t)) * 255;
      pixelArr.push(i);
    }
  }

  // initialize background city skyline pixels
  for (let i = 0; i < numCols; i++) {
    let h = floor(transformNoiseCityH(noise(i)) * 100); // building height
    let w = floor(noise(i, i) * 15); // building width
    cityArr1.push(h);
    cityArr1.push(w);
  }
  console.log(cityArr1);

}

function draw() {
  t += 0.04;
  background(220);
  drawPixelArr();
  addCityPixels();

  // update cloud array
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      pixelArr[r*numCols + c] = transformNoiseCloud(noise(t + r*0.05, c*0.05, t)) * 255;
    }
  }
}

function transformNoiseCloud(n) {
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

// function transformNoiseCityW(n) {
//   if (n < 0.25) {
//     n = 0.25;
//   }
// }

function transformNoiseCityH(n) {
  if (n < 0.3) {
    return 0.3;
  } else {
    return n;
  }
}

function changePixel(xpos, ypos, value) {

}

function drawPixelArr() {
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (pixelArr[r*numCols + c] == 300) {
        fill('powderblue');
      } else {
        fill(color(pixelArr[r*numCols + c]));
      }
      // strokeWeight(1); //uncomment to see pixel outlines
      // stroke('red');
      rect(r*rectSide, c*rectSide, rectSide, rectSide);
    }
  }
}

// modifies pixelArr to add colors of the buildings
function addCityPixels() {
  let runningWidth = 0;
  let prevWidth = 0;
  let i = 0;
  while (runningWidth < canvasWidth) {
    fill('powderblue');
    rect(runningWidth, canvasHeight-(cityArr1[2*i] * rectSide), cityArr1[2*i +1]*rectSide, cityArr1[2*i] * rectSide);
    i++;
    runningWidth += cityArr1[2*i +1]*rectSide;
  }

  // for (let i = 0; i<numCols; i++) {
  //   for (let h = cityArr1[2*i]; h > 0; h--) {
  //     for (let w = cityArr1[(2*i)+1]; w > 0; w--) {
  //       pixelArr[(numRows-1-h)*numCols + (runningWidth+w)] = 300;
  //     }
  //     runningWidth += cityArr1[(2*i)+1];
  //     console.log(runningWidth);
  //   }
  // }
}
