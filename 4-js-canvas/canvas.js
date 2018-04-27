const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

let DRAWING_MODE = false;

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

function drawLine(x, y) {
  if (DRAWING_MODE === false) {
    return;
  }
  c.lineTo(x, y);
  c.stroke();
}

function HandleMouse(e) {
  let pos = getMousePos(e);
  drawLine(pos.x, pos.y);
}

function HandleTouch(e) {
  e.preventDefault();
  let pos = getTouchPos(e);
  drawLine(pos.x, pos.y);
}

function DrawModeOn(e) {
  DRAWING_MODE = true;
}

function DrawModeOff() {
  DRAWING_MODE = false;
}

function addListeners() {
  canvas.addEventListener('mousemove', HandleMouse);
  canvas.addEventListener('touchmove', HandleTouch);

  canvas.addEventListener('touchstop', DrawModeOff);
  canvas.addEventListener('mouseup', DrawModeOff);
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('touchstart', function(e) {
    DrawModeOn(e);
    let pos = getTouchPos(e)
    c.moveTo(pos.x, pos.y);
  });

  canvas.addEventListener('mousedown', function(e) {
    DrawModeOn(e);
    let pos = getMousePos(e)
    c.moveTo(pos.x, pos.y);
  });
}

function clearCanvasScreen() {
  c.closePath();
  c.fillStyle='#FFF'; 
  c.fillRect(0,0,canvas.width,canvas.height);
  c.beginPath();
}

// Fixes the size of the canvas so that it appears nicely on the page.
function resizeCanvas() {
  let body =  document.querySelector('body');
  let w = window.getComputedStyle(body).getPropertyValue('width');
  let h = window.getComputedStyle(body).getPropertyValue('height');
  canvas.width = parseInt(w, 10);
  canvas.height = parseInt(h, 10);
}

// Start off the canvas path drawings, and add event listeners.
resizeCanvas();
addListeners();
c.beginPath();
c.stroke();


// ======================================================================
// Put code here! 




// ======================================================================