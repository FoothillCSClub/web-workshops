const canvas_drawing = (function(){
"use strict";
/*
==========================================================================
Canvas Drawing

contains miscenallious functions and shapes for drawing stuff on
the canvas.
==========================================================================
*/

// Draws a plus sign, centered at (centerX, centerY).
// c = canvas context
function DrawPlus(c, centerX, centerY, sideLength) {
    c.beginPath();
    c.moveTo(centerX - sideLength / 2, centerY);
    c.lineTo(centerX + sideLength / 2, centerY);
    c.moveTo(centerX, centerY - sideLength / 2);
    c.lineTo(centerX, centerY + sideLength / 2);
    c.closePath();
    c.stroke();
}

function DrawTargetBox(c, x, y) {
    c.strokeStyle = 'black';
    c.strokeRect(x - 5, y - 5, 10, 10);
    DrawPlus(c, x, y, 10);
}


/* ===================================================================== */
return {
    DrawPlus: DrawPlus,
    DrawTargetBox: DrawTargetBox,
}
/* ===================================================================== */
}()); // end of namespace.