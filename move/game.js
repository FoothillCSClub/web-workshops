let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
let startGame = ()=>{
    // resizeCanvas();
    // drawWalls();
    mainLoop();
    canvas.style.top = bounds.max_top + "px";
    canvas.style.left = bounds.max_left + "px";
};


let speed = 5;

let savedX = 200;
let savedY = 200;

let targetX = 200;
let targetY = 200;
let bounds = {
    min: {x:    0, y:    0},
    max: {x: 3000, y: 3000},

    max_top: 30,
    max_left: 30,
}


function resolveCanvasPos(clientX, clientY) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
    };
}

function getMousePos(event) {
    return resolveCanvasPos(event.clientX, event.clientY);
}

function getTouchPos(e) {
    return resolveCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
}

function drawPlus(centerX, centerY, sideLength) {
    c.beginPath();
    c.moveTo(centerX - sideLength / 2, centerY);
    c.lineTo(centerX + sideLength / 2, centerY);
    c.moveTo(centerX, centerY - sideLength / 2);
    c.lineTo(centerX, centerY + sideLength / 2);
    c.closePath();
    c.stroke();
}


// updated version of drawBox
function updateTarget(event) {
    targetX = event.x;
    targetY = event.y;        
}

function drawTargetBox(x, y) {
    c.strokeStyle = 'black'
    c.strokeRect(x - 5, y - 5, 10, 10);
    drawPlus(x, y, 10);
}

function moveBox() {
    // move towards target along x-axis.
    if ((targetX - savedX) > 5) {
        savedX += speed;
    }
    if ((targetX - savedX) < 5) {
        savedX -= speed;
    }
    // move towards target along y-axis.
    if ((targetY - savedY) > 5) {
        savedY += speed;
    }
    if ((targetY - savedY) < 5) {
        savedY -= speed;
    }
}


let move_counter = 0;

function mainLoop() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    drawTrees();
    moveBox();
    adjustView(savedX, savedY);    

    // draws the red box.
    c.fillStyle = 'red';
    c.fillRect(savedX - 25, savedY - 25, 50, 50);

    // draws the target box
    drawTargetBox(targetX, targetY);

    // Tells the browser to start again, when it's ready.
    window.requestAnimationFrame(mainLoop);
}


function adjustView(xin, yin) {
    let r1 = canvas.getBoundingClientRect();

    let new_top = -yin + window.screen.height/2;
    let new_left = -xin + window.screen.width/2;
  
    if (new_top < bounds.max_top) {
        canvas.style.top = new_top + 'px';    
    }
    if (new_left < bounds.max_left) {
        canvas.style.left = new_left + 'px';
    }
    
}

// -------------------
// NEXT STEPS
// 1. func UnitVector
//    CHALLENGE!
//
// 2. Create AlternativMotion()
//
//
function UnitVector(vec_x, vec_y) {
    let length = Math.sqrt(Math.pow(vec_x, 2) + Math.pow(vec_y, 2));
    return {
        x: vec_x / length,
        y: vec_y / length
    }
}

function moveBoxEvenly() {
    let vectorX = targetX - savedX;
    let vectorY = targetY - savedY;
    let ourMove = UnitVector(vectorX, vectorY);

    if (Math.abs(vectorX) > 5) {
        savedX += (speed * ourMove.x);
    }
    if (Math.abs(vectorY) > 5) {
        savedY += (speed * ourMove.y);
    }
}

// Fixes the size of the canvas so that it appears nicely on the page.
function resizeCanvas() {
    let body = document.querySelector('body');
    let w = window.getComputedStyle(body).getPropertyValue('width');
    let h = window.getComputedStyle(body).getPropertyValue('height');
    canvas.width = parseInt(w, 10);
    canvas.height = parseInt(h, 10);
}


canvas.addEventListener('mousedown', HandleMouse);
canvas.addEventListener('touchstart', HandleTouch);

function HandleMouse(e) {
  let pos = getMousePos(e);
  targetX = pos.x;
  targetY = pos.y;
}

function HandleTouch(e) {
  e.preventDefault();
  let pos = getTouchPos(e);
  targetX = pos.x;
  targetY = pos.y;
}


function resolveCanvasPos(clientX, clientY) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height)
  };  
}

function getMousePos(event) {
  return resolveCanvasPos(event.clientX, event.clientY);
}

function getTouchPos(e) {
  return resolveCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
}




// ===========================================================
//                       Stash spot for later ;)
//                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let rando_list = [];

function drawTrees() {
    for (let i=0; i<100; i++) {
//       if (!rando_list[i]) {
//         return;
//       }
      c.fillStyle = rando_list[i].color;
      c.fillRect(
        rando_list[i].x, 
        rando_list[i].y, 
        rando_list[i].w, 
        rando_list[i].h
      );
    }
}

// // INitialize the epic arrays
// // Draw random stuff everywhere so there are reference points.
function initTrees() {
    for (let i=0; i<100; i++) {

        rando_list.push ({
          x: Math.floor(bounds.max.x * Math.random()),
          y: Math.floor(bounds.max.y * Math.random()),
          w: Math.floor(20* Math.random()),
          h: Math.floor(20* Math.random()),
          color: getRandomColor(),
        });
    }
    console.log(rando_list);
}
initTrees();
// ===========================================================