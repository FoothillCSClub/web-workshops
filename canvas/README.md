# Canvas

The Canvas is an HTML element that acts like a picture, but easily allows you 
to draw anything you want!  It works really well with drawing lines, shapes,
animations, and is great for making things like games.

## 1. HTML, Javascript, and the Canvas

In your HMTL, you can add a canvas element, and define it's width and height.
You can change it to anything you want!

~~~html
<canvas width="100" height="100">
</canvas>
~~~

Then, in javascript, you can start using the canvas by getting it's context.

~~~js
let canvas = document.getElementById("canvas");
let c = canvas.getContext("2d");
~~~

Most of the fun drawing functions in canvas are used through this context.
For example, if you want to draw a rectangle, you could write:

~~~js
c.fillRect(x, y, width, height);
~~~

In the rest of this guide, all of the functions will use this context.





## Shapes and Colors

1.  Open this codepen: **[Drawing Shapes](https://codepen.io/fractalbach/pen/gzLZoQ?editors=0010#0)**

2.  Rectangles are made using these commands.  Where *x, y* is point of the 
    upper-left corner of the rectangle.

    ~~~js
    fillRect(x, y, width, height)
    strokeRect(x, y, width, height)
    ~~~

## Events

1.  Open the codepen: **[Click Events](https://codepen.io/fractalbach/pen/gzLZoQ?editors=1111)**

2.  Notice that the HTML canvas element now has another attribute:

    ~~~html
    <canvas id="canvas" width="500" height="500" onmousedown="wow(event);">
    ~~~    


# Advanced Topics

-  [Basic Animations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations)


# References & Links

-   The very helpful [*Eloquent Javascript*](http://eloquentjavascript.net)
    has a chapter called [Drawing on Canvas](http://eloquentjavascript.net/17_canvas.html),
    which goes over some of the basic topics in canvas, 
    and relates them to other concepts in javascript and HTML.


-   [Mozilla Developer Net - Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
    is a great reference to look up canvas commands.  there is also a great [Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/), and some more
    in-depth information about the specifics of how canvas works.


-   [Mozilla Developer Net - Web Technology for Developers](https://developer.mozilla.org/en-US/docs/Web)
    is a great place to explore.


-   [Drawing Shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)]


