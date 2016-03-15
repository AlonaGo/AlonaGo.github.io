var width, height, center;
var points = 10;
var smooth = true;
var path;
var mousePos;
var pathHeight;
var images = [];
paper.install(window);

function initializePath() {
    path = new Path();
    mousePos = view.center;
    mousePos.y = view.center.y / 2;
    pathHeight = mousePos.y;
    //path.fillColor = 'black';
    center = view.center;
    width = view.size.width;
    height = view.size.height / 2;
    path.segments = [];
    path.add(view.bounds.bottomLeft);
    for (var i = 1; i < points; i++) {
        var point = new Point(width / points * i, center.y);
        path.add(point);
    }
    path.add(view.bounds.bottomRight);
    //path.fullySelected = true;

    console.log(path.length);
    for (var i = 0; i < 100; i++) {
        var point = path.getPointAt(i * 20);
        var img = new Image();
        img.src = "assets/textbox.png"
        img.style="position:absolute;left: " + point.x + "px;top:" + point.y + "px;";
        document.body.appendChild(img);
        images.push(img);
    }
}

window.onload = function() {
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
    initializePath();

    view.onFrame = function(event) {
        if (path) {
            pathHeight += (center.y - mousePos.y - pathHeight) / 10;
            for (var i = 1; i < points; i++) {
                var sinSeed = event.count + (i + i % 10) * 100;
                var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
                var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
                path.segments[i].point.y = yPos;
            }
            if (smooth)
                path.smooth({ type: 'continuous' });

            //console.log(path.getPointAt(0));
            imgIndex = 0;
            for (var i = 0; i < 100; i++) {
                var point = path.getPointAt(i * 20);
               // console.log(point);
                if (point) {
                    images[imgIndex].style="position:absolute;left: " + point.x + "px;top:" + point.y + "px;";
                }
                imgIndex++;
            }

        }
    }

    view.onMouseMove = function(event) {
        mousePos = event.point;
    }
}
