const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

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

function HandleMouse(e) {
  let pos = getMousePos(e);
  c.lineTo(pos.x, pos.y);
  c.stroke();
}

function HandleTouch(e) {
  let pos = getTouchPos(e);
  c.lineTo(pos.x, pos.y);
  c.stroke();
}

function addListeners() {
  canvas.addEventListener('mousemove', HandleMouse,);
  canvas.addEventListener('click', HandleMouse);
  canvas.addEventListener('touchstart', HandleTouch, false);
  canvas.addEventListener('touchmove', HandleTouch, false);
}

function clearCanvasScreen() {
  c.closePath();
  c.fillStyle='#FFF'; 
  c.fillRect(0,0,canvas.width,canvas.height);
  c.beginPath();
}

// Fixes the size of the canvas so that it appears nicely on the page.
let body =  document.querySelector('body');
let w = window.getComputedStyle(body).getPropertyValue('width');
let h = window.getComputedStyle(body).getPropertyValue('height');
canvas.width = parseInt(w, 10);
canvas.height = parseInt(h, 10);

// Start off the canvas path drawings, and add event listeners.
c.beginPath();
c.stroke();
addListeners();


// ======================================================================
// Put code here! 




// ======================================================================