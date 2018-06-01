const TheGame = (function() {
"use strict";
/*
==========================================================================
The Game

This is the final module to load, and controls the game loop, the 
animation refresh rate, and combines all of the other modules to 
make a playable game.  Ideally, all of the modules (other than this one)
should be decoupled, and this will be the only one to depend on them.

Dependencies

  index.html:  makes use of the elements in the HTML.
  canvas_view: determines viewing area boundaries.
  background:  draws and updates the background canvas.
  cat:         cat canvas position and animation.

==========================================================================
*/

const canvas_cat = document.querySelector('#canvas_cat');
const context_cat = canvas_cat.getContext('2d');

const canvas_background = document.querySelector('#canvas_background');
const context_background = canvas_background.getContext('2d');

const debug = {
  cat_actual: document.querySelector('#debug_cat_actual'),
  target_actual: document.querySelector('#debug_target_actual'),
  cat_game: document.querySelector('#debug_cat_game'),
  target_game: document.querySelector('#debug_target_game'),
  zone_left: document.querySelector('#debug_zone_left'),
  zone_right: document.querySelector('#debug_zone_right'),
  zone_top: document.querySelector('#debug_zone_top'),
  zone_bottom: document.querySelector('#debug_zone_bottom'),
  debug_cat_direction: document.querySelector('#debug_cat_direction'),
  debug_cat_anim_index: document.querySelector('#debug_cat_anim_index'),
};

const speed = 5;

// the size of the total game area (in pixels).  Not neccesarily the same thing
// as the size of the screen.  A subsection of this area will be visible.
let logical_map_size = {
  x: 4000,
  y: 4000,
}
// where the cat is relative to the logical map.  (the game position)
let logical_cat_pos = {
  x: 200,
  y: 200,
}

let screen_cat_pos = {
  x: canvas_background.width / 2,
  y: canvas_background.height / 2,
}

// the actual position on the screen where the cat is.
// this is the center of the screen most of the time,
// unless you are by the edges of the logical game map.
let saved = {
  x: 200,
  y: 200,
}
// the last position, used to check if it is neccesary to move the DOM canvas element.
let old_saved = {
  x:0,
  y:0,
}

// the actual position on the screen that was clicked.  This gets converted into
// a logical game target position.
let target = { 
  x: 200,
  y: 200,
}
// the logical target: the position on the game map that the cat moves to.
let logical_target = {
  x: 200,
  y: 200,
}

let rect_upper_left_quad = function () {
  return {
    x0: 0,
    y0: 0,
    xf: canvas_background.width / 2,
    yf: canvas_background.height / 2,
  }
}


// playerIn_____Boundary returns true/false depending where they
// are in the LOGICAL game playing area.  This can be used to 
// determine if the cat should move on the SCREEN when it moves 
// through the GAME and approaches the borders.
// 
// These are functions because they use the size of the canvas itself,
// which can change throughout game play (like when you resize screen).
//
function playerInUpperBoundary (y) {
  if (y < (canvas_background.height / 2)) {
    return true;
  }
  return false;
}

function playerInLowerBoundary (y) {
  if (y > (logical_map_size - (canvas_background.height /2))) {
    return true;
  }
  return false;
}

function playerInLeftBoundary (x) {
  if (x < (canvas_background.width / 2)) {
    return true;
  }
  return false;
 }

function playerInRightBoundary (x) {
  if (x > (logical_map_size - (canvas_background.width / 2))) {
    return true;
  }
  return false;
}

// updated version of drawBox
function updateTarget(event) {
    targetX = event.x;
    targetY = event.y;        
}

function updateDebugText() {
  debug.cat_actual.innerText = `${saved.x}, ${saved.y}`;
  debug.target_actual.innerText = `${target.x}, ${target.y}`;
  debug.cat_game.innerText = `${logical_cat_pos.x}, ${logical_cat_pos.y}`;
  debug.target_game.innerText = `${logical_target.x}, ${logical_target.y}`;
  debug.zone_left.innerText = `${playerInLeftBoundary(logical_cat_pos.x)}`;
  debug.zone_right.innerText = `${playerInRightBoundary(logical_cat_pos.x)}`;
  debug.zone_top.innerText = `${playerInUpperBoundary(logical_cat_pos.y)}`;
  debug.zone_bottom.innerText = `${playerInLowerBoundary(logical_cat_pos.y)}`;
  debug.debug_cat_direction.innerText = `${TheCat.get_facing_direction()}`
  document.querySelector('#debug_cat_anim_index').innerText = `${TheCat.get_current_animation_array_index()}`
  document.querySelector('#debug_cat_is_walking').innerText = `${TheCat.IsWalking()}`
}


let move_counter = 0;
let cat_walk_counter = 0;

function mainLoop() {
    // Adjust the Canvas Viewing Area
    canvas_view.MakeFullScreen(canvas_background);

    // draws the target box
    canvas_drawing.DrawTargetBox(context_background, target.x, target.y);

    // Draws the cat picture.
    TheCat.Draw(context_cat);

    // updates the position and facing direction of the cat.
    saved = TheCat.UpdateCatPosition(saved, target, speed);

    // UPDATES DEUBGGIN INFORMATION.
    if ((saved.x !== old_saved.x) || (saved.y !== old_saved.y)) {
      old_saved.x = saved.x;
      old_saved.y = saved.y;
      canvas_cat.style.left = (saved.x - (TheCat.size.w / 2)) + "px";
      canvas_cat.style.top = (saved.y - (TheCat.size.h / 2)) + "px";
      updateDebugText();
    }
    // Determines which cat animation to use and 
    // allows it to appear like it's walking.
    if (TheCat.IsWalking() === true) {
      cat_walk_counter++;
      if (cat_walk_counter > 10) {
        TheCat.NextAnimation();
        cat_walk_counter = 0;
      }
    }

    // Tells the browser to start again, when it's ready.
    window.requestAnimationFrame(mainLoop);
}




// -------------------
// NEXT STEPS
// 1. func UnitVector
//    CHALLENGE!
//
// 2. Create AlternativMotion()
//
//
// function UnitVector(vec_x, vec_y) {
//     let length = Math.sqrt(Math.pow(vec_x, 2) + Math.pow(vec_y, 2));
//     return {
//         x: vec_x / length,
//         y: vec_y / length
//     }
// }

// function moveBoxEvenly() {
//     let vectorX = targetX - savedX;
//     let vectorY = targetY - savedY;
//     let ourMove = UnitVector(vectorX, vectorY);
    
//     if (Math.abs(vectorY) > 5) {
//         savedY += (speed * ourMove.y);
//     }
//     if (Math.abs(vectorX) > 5) {
//         savedX += (speed * ourMove.x);
//     }
// }

// Fixes the size of the canvas so that it appears nicely on the page.





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



// https://stackoverflow.com/questions/1484506/random-color-generator
// function getRandomColor() {
//   let letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// let rando_list = [];
// let number_of_random_shapes = 300;

// function drawShapes() {
//     for (let i=0; i<number_of_random_shapes; i++) {
//       c.fillStyle = rando_list[i].color;
//       c.fillRect(
//         rando_list[i].x, 
//         rando_list[i].y, 
//         rando_list[i].w,
//         rando_list[i].h,
//         rando_list[i].v, 
//       );
//     }
// }

// // INitialize the epic arrays
// // Draw random stuff everywhere so there are reference points.
// function initShapes() {
//     for (let i=0; i<number_of_random_shapes; i++) {
//         rando_list.push ({
//           x: Math.floor(bounds.max.x * Math.random()),
//           y: Math.floor(bounds.max.y * Math.random()),
//           w: Math.floor(20* Math.random()),
//           h: Math.floor(20* Math.random()),
//           v: Math.floor(10* Math.random()),
//           color: getRandomColor(),
//         });
//     }
// //     console.log(rando_list);
// }
// initShapes();



function AddListeners (canvas) {
  canvas.addEventListener('mousedown', HandleMouse);
  canvas.addEventListener('touchstart', HandleTouch);
}

function HandleMouse(e) {
  let pos = user_input.getMousePos(canvas_background, e);
  target.x = pos.x;
  target.y = pos.y;
}

function HandleTouch(e) {
  e.preventDefault();
  let pos = user_input.getTouchPos(canvas_background, e);
  targetX = pos.x;
  targetY = pos.y;
}


// ===========================================================


return {
  Start: () => {
    canvas_view.MakeFullScreen(canvas_background);
    AddListeners(canvas_background);
    mainLoop();
  },

  updateDebugText: updateDebugText,
}

/* ===================================================================== */
}()); // end of namespace.