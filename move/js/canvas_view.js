const canvas_view = (function() {
"use strict";
/*
==========================================================================
Canvas View
==========================================================================
*/

// const bounds = {
//     min: {
//       x: 0,
//       y: 0
//     },
//     max: {
//       x: TheMap.width,
//       y: TheMap.width,
//     },
//     padding: 0,
// }


// let view_bounds = () => {
//   return {
//     max_top: bounds.padding,
//     max_left: bounds.padding,
//     min_top: -canvas.height + document.documentElement.clientHeight - bounds.padding,
//     min_left: -canvas.width + document.documentElement.clientWidth - bounds.padding,  
//   }
// }

let saved_proportions = {
    w: 0,
    h: 0,
}


// function adjustView(canvas, xin, yin) {
//     let r1 = canvas.getBoundingClientRect(); 
//     let new_left = -xin + document.documentElement.clientWidth/2;
//     let new_top = -yin + document.documentElement.clientHeight/2;
//     let vb = view_bounds();
//     //     canvas.style.top = new_top + 'px';
//     //     canvas.style.left = new_left + 'px';    

//     if ((new_top < vb.max_top) && (new_top > vb.min_top)) {
//         canvas.style.top = new_top + 'px';
//     }
//     if ((new_left < vb.max_left) && (new_left > vb.min_left)) {
//         canvas.style.left = new_left + 'px';
//     }
    
// }


// Makes the given canvas element into fullsreen, but only does it
// if the screen size is different than it was last time we checked.
function MakeFullScreen(canvas) {
    let body = document.querySelector('body');
    let w = window.getComputedStyle(body).getPropertyValue('width');
    let h = window.getComputedStyle(body).getPropertyValue('height');
    w = parseInt(w, 10);
    h = parseInt(h, 10);
    // exits if they are already the same.
    if ((w == saved_proportions.w) && (h == saved_proportions.h)) {
        return;
    }
    // changes them if they aren't.
    canvas.width = w;
    canvas.height = h;
    return {w:w, h:h};
}



/* ===================================================================== */
return {
    MakeFullScreen: MakeFullScreen,
}
/* ===================================================================== */
}()); // end of namespace.