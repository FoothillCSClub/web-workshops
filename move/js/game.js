let canvas = document.querySelector('canvas');
let TheMap = document.querySelector('#TheMap');
// let original_map_height = TheMap.height;
// let original_map_width = TheMap.width;

// 2x expand the map (height is automatically stretched.)
TheMap.width = 2 *TheMap.width;
canvas.width = TheMap.width;
canvas.height = TheMap.height;


let c = canvas.getContext('2d');
let startGame = ()=>{
    // resizeCanvas();
    // drawWalls();
    canvas.style.top = view_bounds.max_top + "px";
    canvas.style.left = view_bounds.max_left + "px";
    mainLoop();

};


let speed = 5;

let savedX = 200;
let savedY = 200;
let targetX = 200;
let targetY = 200;
let bounds = {
    min: {
      x: 0,
      y: 0
    },
    max: {
      x: TheMap.width,
      y: TheMap.widht,
    },
    padding: 0,
}
let view_bounds = () => {
  return {
    max_top: bounds.padding,
    max_left: bounds.padding,
    min_top: -canvas.height + document.documentElement.clientHeight - bounds.padding,
    min_left: -canvas.width + document.documentElement.clientWidth - bounds.padding,  
  }
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

    cat_is_walking = false;
    let temp_facing = [];
    // move towards target along y-axis.
    if ((targetY - savedY) > 5) {
        savedY += speed;
        temp_facing.push("s");
    }
    if ((targetY - savedY) < -5) {
        savedY -= speed;
        temp_facing.push("n");
    }
    // move towards target along x-axis.
    if ((targetX - savedX) > 5) {
        savedX += speed;
        temp_facing.push("e");
    }
    if ((targetX - savedX) < -5) {
        savedX -= speed;
        temp_facing.push("w");
    }

    // If the cat is moving, save that state.
    if (temp_facing.length >= 1) {
      cat_is_walking = true;  
    }
    

    // Decide if you need to change directions of the cat,
    // and what direction to change it to.
    let changed_direction = false;
    // either north or south, can't be both.
    if (temp_facing.includes("n")) {
      cat_is_facing = "n";
      changed_direction = true;
    } else if (temp_facing.includes("s")) {
      cat_is_facing = "s";
      changed_direction = true;
    }
    // either east or west, can't be both.
    // If we already changed directions to North/South
    // then add an additional direction for East/West.
    // Otherwise, we are facing absolute East/West.
    if (temp_facing.includes("w")) {
      if (changed_direction) {
        cat_is_facing += "w";
      } else {
        cat_is_facing = "w";
      }
    } else if (temp_facing.includes("e")) {
      if (changed_direction) {
        cat_is_facing += "e";  
      } else {
        cat_is_facing = "e";
      }
    }
}


let move_counter = 0;

function mainLoop() {
    c.clearRect(0, 0, canvas.width, canvas.height);
//     drawShapes();
    moveBox();
    adjustView(savedX, savedY);    

    // draws the target box
    drawTargetBox(targetX, targetY);

    // draws the red box.
    //c.fillStyle = 'red';
    //c.fillRect(savedX - 25, savedY - 25, 50, 50);

    // Determines which cat animation to use and 
    // allows it to appear like it's walking.
    if (cat_is_walking) {
      cat_walk_counter++;  
    }
    if (cat_walk_counter > 29) {
      cat_walk_counter = 0;
    }
    
    // Get the set of animations based on direction 
    cur_anim_array = cat_ANIM[cat_is_facing];

    // Change the current cat animation to something else. 
    current_cat_anim = cur_anim_array[Math.floor(cat_walk_counter/10)];

    // Draws the cat picture.
    drawCat(c, savedX-(cat_size_w/2), savedY-(cat_size_h/2));


    // Tells the browser to start again, when it's ready.
    window.requestAnimationFrame(mainLoop);
}


function adjustView(xin, yin) {
    let r1 = canvas.getBoundingClientRect(); 
    let new_left = -xin + document.documentElement.clientWidth/2;
    let new_top = -yin + document.documentElement.clientHeight/2;
    let vb = view_bounds();
//     canvas.style.top = new_top + 'px';
//     canvas.style.left = new_left + 'px';    

    if ((new_top < vb.max_top) && (new_top > vb.min_top)) {
        canvas.style.top = new_top + 'px';
        TheMap.style.top = new_top + 'px';
    }
    if ((new_left < vb.max_left) && (new_left > vb.min_left)) {
        canvas.style.left = new_left + 'px';
        TheMap.style.left = new_left + 'px';
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




// https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let rando_list = [];
let number_of_random_shapes = 300;

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



// Draw the background.
// width="4476" height="3128"
// let background_image_width = 4476;
// let background_image_height = 3128;
// let background_image = new Image();
// background_image.src = "img/the_map.png";
// c.drawImage(background_image, 0, 0);
// ===========================================================


