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



// =====================================================================
//                     ~ Add your drawing code here! ~










// =====================================================================








