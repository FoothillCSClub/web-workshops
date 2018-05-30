
let catImage = new Image();
catImage.src = "img/cats.png";
let cat_size_w = 85;
let cat_size_h = 87;
let cat_walk_counter = 0;
let cat_is_walking = false;
let cat_is_facing = "s";
let cat_ANIM_down = [
  {nx: 0, ny: 0}, {nx: 1, ny: 0}, {nx:2, ny:0}
]
let cat_ANIM = {
  s: [{nx: 0, ny: 0}, {nx: 1, ny: 0}, {nx:2, ny:0}],
  w: [{nx: 0, ny: 1}, {nx: 1, ny: 1}, {nx:2, ny:1}],
  e: [{nx: 0, ny: 2}, {nx: 1, ny: 2}, {nx:2, ny:2}],
  n: [{nx: 0, ny: 3}, {nx: 1, ny: 3}, {nx:2, ny:3}],
  sw: [{nx: 3, ny: 0}, {nx: 4, ny: 0}, {nx:5, ny:0}],
  nw: [{nx: 3, ny: 1}, {nx: 4, ny: 1}, {nx:5, ny:1}],
  se: [{nx: 3, ny: 2}, {nx: 4, ny: 2}, {nx:5, ny:2}],
  ne: [{nx: 3, ny: 3}, {nx: 4, ny: 3}, {nx:5, ny:3}],
}
let current_cat_anim = {
  nx: 0, 
  ny: 0,
};

function getCatAnimArray(direction) {
  switch (direction) {
    case "s": return cat_ANIM.s;
    case "n": return cat_ANIM.n;
    case "w": return cat_ANIM.w;
    case "e": return cat_ANIM.e;
  }
}

function drawCat(c, x, y) {
  let cat = getCat(current_cat_anim);
  c.drawImage(catImage, cat.sx, cat.sy, cat.sw, cat.sh, x, y, cat.sw, cat.sh);
}

// 0, 0 = first image
function getCat(cat_anim) {
  return {
    sx: cat_size_w * cat_anim.nx,
    sy: cat_size_h * cat_anim.ny,
    sw: cat_size_w,
    sh: cat_size_h,
  }
}