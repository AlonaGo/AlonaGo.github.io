/*paper.install(window);
window.onload = function() {
	// Setup directly from canvas id:
	// Create a circle shaped path with its center at the center
// of the view and a radius of 30:
	var canvas = document.getElementById('myCanvas');
	paper.setup(canvas);
	var path = new Path.Circle({
	center: view.center,
	radius: 100,
	strokeColor: 'black'
	});
	console.log(path);
	for (var i = 0; i < path.length; i++) {
	var point = path.getPointAt(i);
	console.log(point)
 	};
}*/


 var minim = null;
var sou = null;
var gameStart =  false;
var ballActive =  $p.createJavaArray('boolean', [3]);
var bunny =   $p.random(30,300);
var rectSize =  100;
var topColor =  0xFF96A6FF;
var bottomColor =  0xFF96A6FF;
var z =  100;
var dz =  1;
var img2 = null;
var img1 = null; 
var img = null;
var x =  $p.createJavaArray('float', [3]);
var y =  $p.createJavaArray('float', [3]);
var speedx =  $p.createJavaArray('float', [3]);
var speedy =  $p.createJavaArray('float', [3]);
var numberOfBalls = 0;

function setup() {
minim = new Minim(this);
  sou = minim.loadFile("bunny.mp3");
  sou.loop();
  $p.size(500, 500);
  $p.noStroke();
  $p.smooth();
   img1 = $p.loadImage("galax.jpg");     img = $p.loadImage("bunny.png");      ballActive[0]= true;
   ballActive[1]= false;
   ballActive[2]= false;
   numberOfBalls = 1;

   x[0] = 250;     y[0] = 250;
   speedx[0] = $p.random(3, 6);
   speedy[0] = $p.random(3, 6);
}
$p.setup = setup;

function draw() {
$p.background(0);

  $p.image(img1, -500, -500 );    $p.image(img, z, 100);           z= z +dz;

  if (z > 400) {
dz= -1;
}

  if (z<100) {
dz=1;
}

   for (var i =  0;   i< 3;  i++) {
if (ballActive[i]) {
$p.fill(0xFF96A6FF);
                 $p.ellipse(x[i], y[i], 20, 20);

                 if (gameStart) {
x[i] = x[i] + speedx[i];
                y[i] = y[i] + speedy[i];
}
                                  if ( y[i] > $p.height-30 && x[i] < $p.height -20 && x[i] > $p.mouseX-rectSize/2 && x[i] < $p.mouseX+rectSize/2 ){
speedy[i] = speedy[i] * -1;
                 y[i] = y[i] + speedy[i];
                 bottomColor = 255;
}
                                                   else if (y[i] < 2) {
speedy[i] = speedy[i] * -1;
                  y[i] = y[i] + speedy[i];
                  topColor = 255;
}
                else {
topColor = 0xFF96A6FF;
                  bottomColor = 0xFF96A6FF;
}
                                 if ( x[i] > $p.width-10 || x[i] < 10 ) {
speedx[i] = speedx[i] * -1;
                  x[i] = x[i] + speedx[i];
}

                                 if (y[i] > $p.height) {
numberOfBalls--;
                  ballActive[i]= false;
                  if(numberOfBalls==0){
gameStart = false;
                    numberOfBalls=1;
                    x[0]= 250;
                    y[0]= 250;
                    speedx[0] = $p.random(3, 6);
                    speedy[0]= $p.random(3, 6);
                    rectSize = 100;
                    ballActive[0] = true;
                    ballActive[1] = false;
                    ballActive[2] = false;
}
}

                                  if (x[i]<=z+20 && x[i]>=z-20 && y[i]>=80 && y[i]<=120 ) {
$p.println("hei");
                  img2 = $p.loadImage("bunny_pink.png");                    $p.image(img2, z, 100);

                  if (numberOfBalls<3){
numberOfBalls++;
                    var newBall = 0;
                    if(!ballActive[0]){
newBall=0;
}
                    else if (!ballActive[1]){
newBall=1;
}
                    else {
newBall=2;
} 
                    x[newBall] = z;                      y[newBall] = 100;
                    speedx[newBall] = $p.random(3, 6);
                    speedy[newBall] = $p.random(3, 6);
                    ballActive[newBall]= true;
}
}
}
}

    $p.fill(topColor);               $p.rect(0, 0, $p.width, 20);
    $p.fill(bottomColor);              $p.rect ($p.mouseX-rectSize/2, $p.height-30, rectSize, 10);
}
$p.draw = draw;
function mousePressed() {

