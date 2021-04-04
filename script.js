
let canvasWidth = 1000;
let canvasHeight = 600;
let rectSide = 10;
let numRows = canvasWidth/rectSide;
let numCols = canvasHeight/rectSide;
let pixelArr = [];
let starArr = [];
let t = 0;
let colorArr = [
[[345, 80, 60], [345, 90, 70], [330, 100, 74], [320, 100, 90], [310, 100, 95],[193, 100, 89], [229, 52, 16],
[192, 100, 94]], // reds
[[160, 70, 53], [150, 80, 62], [140, 90, 69], [130, 100, 78], [117, 100, 90], [193, 100, 89], [229, 52, 16],
[192, 100, 94]], // greens
[[260, 70, 56], [250, 80, 62], [240, 90, 67], [230, 100, 73], [227, 100, 85], [193, 100, 100], [229, 52, 16],
[192, 100, 94]], // blues
[[300, 60, 50], [295, 75, 58], [290, 87, 64], [284, 100, 73] ,[284, 100, 81],[193, 100, 89], [229, 52, 16],
[192, 100, 94]],//purples
[[48, 80, 64], [55, 90, 70], [60, 100, 74], [68, 100, 79], [68, 100, 95], [193, 100, 89], [229, 52, 16],
[192, 100, 94]]//yellows
];

// toggleables
let colorSet = 0;
let dayNightMode = 0; //even=day, odd=night
let frames = 3;
let cloudMode = 0;

function setup() {
  let myCanvas = createCanvas(canvasWidth, canvasHeight);
  rectMode(CORNER);
  noStroke();
  noiseDetail(4, 0.6);
  frameRate(frames);
  colorMode(HSL, 360, 100);

  background(220);

  // initialize array of pixels
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = transformNoise(noise(r*0.05, c*0.05, t));
      pixelArr.push(i);
    }
  }

  // initialize star array
  initStarArr();
}

function draw() {
  frameRate(frames);
  addStars();
  drawPixelArr();
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      pixelArr[r*numCols + c] = transformNoise(noise(t + r*0.05, c*0.05, t));
    }
  }
  t += 0.04;
}

function transformNoise(n) {
  if (cloudMode % 3 == 0) {
    return transformNoise1(n);
  } else if (cloudMode % 3 == 1) {
    return transformNoise2(n);
  } else {
    return transformNoise3(n);
  }
}

function transformNoise1(n) {
  if (n < 0.5) {
    if (dayNightMode%2 == 0) {
      return 5;
    } else {
      return 6;
    }
    return 5;
  } else if (n < 0.6) {
    return 0;
  } else if (n < 0.7) {
    return 1;
  } else if (n < 0.8) {
    return 2;
  } else if (n < 0.9) {
    return 3;
  } else {
    return 4;
  }
}

function transformNoise2(n) {
  if (n < 0.7) {
    if (dayNightMode%2 == 0) {
      return 5;
    } else {
      return 6;
    }
    return 5;
  } else if (n < 0.75) {
    return 0;
  } else if (n < 0.8) {
    return 1;
  } else if (n < 0.85) {
    return 2;
  } else if (n < 0.93) {
    return 3;
  } else {
    return 4;
  }
}

function transformNoise3(n) {
  if (n < 0.5) {
    if (dayNightMode%2 == 0) {
      return 5;
    } else {
      return 6;
    }
    return 5;
  } else if (n < 0.5625) {
    return 0;
  } else if (n < 0.625) {
    return 1;
  } else if (n < 0.6875) {
    return 2;
  } else if (n < 0.75) {
    return 3;
  } else if (n < 0.8125) {
    return 4;
  } else if (n < 0.875) {
    return 3;
  } else if (n < 0.9375) {
    return 2;
  } else if (n < 0.93) {
    return 1;
  } else {
    return 0;
  }
}

function transformStar(n) {
  if (n < 0.99) {
    return 0;
  } else {
    return 1;
  }
}

function initStarArr() {
  starArr = [];
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      let i = transformStar(random());

      // avoid 2 adjacent white pixels
      if (c > 0) { // square to the left
        if (starArr[r*numCols + c - 1] == 1) {
          i = 0;
        }
      }
      if (r > 0) { // square to the up
        if (starArr[(r-1)*numCols + c] == 1) {
          i = 0;
        }
      }
      if ((r > 0) && (c > 0)) { // square to the up left
        if (starArr[(r-1)*numCols + c - 1] == 1) {
          i = 0;
        }
      }
      if ((r > 0) && (c > 0)) { // square to the up right
        if (starArr[(r-1)*numCols + c + 1] == 1) {
          i = 0;
        }
      }
      starArr.push(i);
    }
  }
}

function addStars() {
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (pixelArr[r*numCols + c] == 6) {
        if (starArr[r*numCols + c] == 1) {
          pixelArr[r*numCols + c] = 7;
        }
      }
    }
  }
}

function changePixel(xpos, ypos, value) {

}

function drawPixelArr() {
  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      if (dayNightMode%2 == 0 || pixelArr[r*numCols + c] > 4) { //daytime
        fill(colorArr[colorSet][pixelArr[r*numCols + c]][0], colorArr[colorSet][pixelArr[r*numCols + c]][1], colorArr[colorSet][pixelArr[r*numCols + c]][2]);
      } else { //nighttime
        fill(colorArr[colorSet][pixelArr[r*numCols + c]][0], colorArr[colorSet][pixelArr[r*numCols + c]][1]-20, colorArr[colorSet][pixelArr[r*numCols + c]][2]-20);
      }

      rect(r*rectSide, c*rectSide, rectSide, rectSide);
    }
  }
}

function changeSeed() {
  noiseSeed(random(0, 10000));
  initStarArr();
}

function changeColorSet() {
  if (colorSet == 4) {
    colorSet = 0;
  } else {
    colorSet++;
  }
}

function changeTimeDay() {
  dayNightMode++;
}

function changeCloudMode() {
  cloudMode++;
}

function changeSpeed(i) {
  frames += i;
}

function resetSpeed() {
  frames = 3;
}
