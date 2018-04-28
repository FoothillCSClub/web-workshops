// ----------------------------------------------------------------------
//                              ~ Canvas ~
// 
// Skip past some of this, this code just helps make the canvas easier
// to deal with.  Skip past this section


const canvas = document.querySelector('#canvas');
const c = canvas.getContext('2d');

resizeCanvas();
addListeners();


function resizeCanvas() {
  let body =  document.querySelector('body');
  let w = window.getComputedStyle(body).getPropertyValue('width');
  let h = window.getComputedStyle(body).getPropertyValue('height');
  canvas.width = parseInt(w, 10);
  canvas.height = parseInt(h, 10);
}

function getMousePos(event) {
  return resolveCanvasPos(event.clientX, event.clientY);
}

function resolveCanvasPos(clientX, clientY) {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (clientX - rect.left) * (canvas.width / rect.width),
    y: (clientY - rect.top) * (canvas.height / rect.height)
  };  
}


// ----------------------------------------------------------------------
//                        ~ About Screen Touches ~
//
// There are other ways to do this, since all the touches are recorded,
// you don't have to just use the first one.  This is especially true 
// for swiping.  The list of all touch positions will be kept in an array.

function getTouchPos(e) {
  return resolveCanvasPos(e.touches[0].clientX, e.touches[0].clientY);
}

// ----------------------------------------------------------------------
//                          ~ Event Listeners ~
// 
//    Try adding some, removing some, or messing them up!
//    Add keyboard events!


function addListeners() {
  window.addEventListener('resize', resizeCanvas);

  canvas.addEventListener('touchstart', onTouchStart);
  canvas.addEventListener('touchmove', onTouchMove);
  canvas.addEventListener('touchstop', onTouchStop);

  canvas.addEventListener('mousedown', onMouseDown);
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);

  canvas.addEventListener('click', onClick);
}



// ======================================================================
//                          ~ Your Functions! ~
//
// This is where the magic happens!  Add your custom functions here!
// 

function onTouchStart(e) {}
function onTouchStop(e) {}

function onClick(e) {}

function onMouseUp(e) {}
function onMouseDown(e) {}

function onMouseMove(event) {
  let pos = getMousePos(event);

  // type stuff here!

}

function onTouchMove(event) {
  event.preventDefault();
  let pos = getTouchPos(event);

  // type stuff here!
}

