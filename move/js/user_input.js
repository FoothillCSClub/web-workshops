const user_input = (function(){
/*
==========================================================================
User Input

Deals with the input from the user, such as a clicks and buttons.
Also deals with event listeners, and addding them to the canvas.
Doesn't depend on the canvas, but a canvas is required to use this.
==========================================================================
*/


function resolveCanvasPos(canvas, clientX, clientY) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: (clientX - rect.left) * (canvas.width / rect.width),
        y: (clientY - rect.top) * (canvas.height / rect.height)
    };
}

function getMousePos(canvas, event) {
    return resolveCanvasPos(canvas, event.clientX, event.clientY);
}

function getTouchPos(canvas, e) {
    return resolveCanvasPos(canvas, e.touches[0].clientX, e.touches[0].clientY);
}


/* ===================================================================== */
return {
    getMousePos: getMousePos,
    getTouchPos: getTouchPos,
}
/* ===================================================================== */
}()); // end of namespace.