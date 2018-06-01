let Background = (function() {
/*  
==========================================================================
The Background script is in charge of creating the illusion of movement.
In this version, the entire background is held in a single image file.
This image file is loaded, but not immediately rendered.

Instead of rendering the image using the HTML <img> tag, a section of 
the image is drawn onto the canvas during each animation frame.
The boundaries of that section is determined based on:
	1. the size of the screen. 
	2. the logical location of the player.

==========================================================================
*/

let img = new Image();
img.src = "img/the_map.png";

// draws the section of the image onto the canvas.
let draw = function (context, x0, y0, xf, yf) {
	context.drawImage(img,
		0, 0, xf-x0, yf-y0,
		x0, y0, xf, yf
	);
}




/* ===================================================================== */
return {
	draw: draw,
}
/* ===================================================================== */
}()); // end of namespace.

