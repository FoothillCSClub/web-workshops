let TheCat = (function() {
"use strict";
/*
==========================================================================
TheCat

The main player character is currently "TheCat".
This controls the canvas element of the id "TheCat".
The Cat's canvas only contains the animation of the cat, and it's 
location on the screen is determined based on:

  1. the size of the screen.
  2. the logical position of the cat relative to the game map.

Most of the time, the cat will simply appear in the center of the screeen.
However, when moving toward the edges of the playing area, the cat
will move away from the center and toward the edge of the screen.
This *should* make it more obvious that you have reached the edge of the
playing area.
==========================================================================
*/

// Load the cat image file.  This contains all of the possible
// pictures of the cat sprite.  
let catImage = new Image();
catImage.src = "img/cats.png";

// The cat_size holds the size of the sprite itself 
// (and also the size of the canvas it will be drawn on).
// This can also be thought of as the size of the "cookie-cutter" that
// is used to cut out images of the cat.
let cat_size = {
  w: 85,
  h: 87,
};

// Declare variables to hold logic related to the cat animation.
// These are used to store the logical state of the cat, which
// will be used to draw the cat.
let cat_is_walking = false;
let cat_is_facing = "s";
let current_animation_array_index = 0;
let current_cat_anim = {
  nx: 0, 
  ny: 0,
};

// Declares position of different cat directions within the source image.
// Since the source image contains ALL of the pictures, this helps 
// figure out which one to choose.  Each "unit" is multipled by the 
// size of the cat sprite.  The result is the top-left (x,y) position 
// of the desired cat pictures, from within the source image.
//
// An array (3) of pictures locations is returned. 
// These are pictures of cats all facing the same direction, 
// and are used together to create an animation!
const cat_ANIM = {
  s: [{nx: 0, ny: 0}, {nx: 1, ny: 0}, {nx:2, ny:0}],
  w: [{nx: 0, ny: 1}, {nx: 1, ny: 1}, {nx:2, ny:1}],
  e: [{nx: 0, ny: 2}, {nx: 1, ny: 2}, {nx:2, ny:2}],
  n: [{nx: 0, ny: 3}, {nx: 1, ny: 3}, {nx:2, ny:3}],
  sw: [{nx: 3, ny: 0}, {nx: 4, ny: 0}, {nx:5, ny:0}],
  nw: [{nx: 3, ny: 1}, {nx: 4, ny: 1}, {nx:5, ny:1}],
  se: [{nx: 3, ny: 2}, {nx: 4, ny: 2}, {nx:5, ny:2}],
  ne: [{nx: 3, ny: 3}, {nx: 4, ny: 3}, {nx:5, ny:3}],
};

// 0, 0 = first image
// GetCat retrives the bounds of the source image that is used for
// the given cat animation.
const getCat = (cat_anim) => {
  return {
    x0: cat_size.w * cat_anim.nx,
    y0: cat_size.h * cat_anim.ny,
    w: cat_size.w,
    h: cat_size.h,
  }
};

// returns the cat animation bounds based on the given direction.  
// Returns an object like {nx, ny}
const getCatAnimArray = (direction) => {
  switch (direction) {
    case "s": return cat_ANIM.s;
    case "n": return cat_ANIM.n;
    case "w": return cat_ANIM.w;
    case "e": return cat_ANIM.e;
    case "sw": return cat_ANIM.sw;
    case "nw": return cat_ANIM.nw;
    case "se": return cat_ANIM.se;
    case "ne": return cat_ANIM.ne;
    default: throw `Given a bad direction: 
    got: ${direction}, 
    cat_is_facing = ${cat_is_facing}`;
  }
};

// Draws the Cat onto using given canvas context starting at
// position (x,y) on that canvas.
function Draw(c) {
  // retrieves the current image of a cat, based on animation.
  let cat = getCat(current_cat_anim);

  // clears the canvas.
  c.clearRect(0, 0, cat.w, cat.h);

  // draws the actual cat.
  c.drawImage(catImage, 
    cat.x0, cat.y0, cat.w, cat.h, 
    0, 0, cat.w, cat.h
  );
};

// Updates the cat animation to the next element in the array of pictures,
// does not change directions, simply "moves its legs, like it's walking".
// Uses modulo 3 because there are only 3 elements in each array.
function NextAnimation () {
  current_animation_array_index = 
    (current_animation_array_index + 1) % 3;

  UpdateCatAnimation();
}

function UpdateCatAnimation () {
  TheGame.updateDebugText();
  current_cat_anim = 
    (getCatAnimArray(cat_is_facing))[current_animation_array_index];
}

// UpdateCat(...) will update both the position and the direction of the cat,
// based on the given variables. It returns a NEW savedX and savedY value!
// The direciton is updated internally, and the position is returned.
function UpdateCatPosition (saved, target, speed) {

  // local variable to hold updated directions, if needed.
  let new_direction = "";

  // moving South?
  if ((target.y - saved.y) > 5) {
      saved.y += speed;
      new_direction += ("s");

  // Moving North? 
  } else if ((target.y - saved.y) < -5) {
      saved.y -= speed;
      new_direction += ("n");
  }

  // Moving East?
  if ((target.x - saved.x) > 5) {
      saved.x += speed;
      new_direction += ("e");

  // Moving West? 
  } else if ((target.x - saved.x) < -5) {
      saved.x -= speed;
      new_direction += ("w");
  }

  // If we are facing a new direction, then Update Cat's direction.
  if (new_direction !== "") {
    cat_is_facing = new_direction;
    cat_is_walking = true;
  } else {
    cat_is_walking = false;
  }
  UpdateCatAnimation();
  return saved;
};

/* ===================================================================== */
return {
  size: cat_size,
  
  NextAnimation: NextAnimation,
  UpdateCatPosition: UpdateCatPosition,
  Draw: Draw,

  IsWalking: (() => {
    return cat_is_walking;
  }),

  get_facing_direction: (() => {
    return cat_is_facing;
  }),

  get_current_animation_array_index: () => {
    return current_animation_array_index
  },

};
/* ===================================================================== */
}()); // end of namespace.
