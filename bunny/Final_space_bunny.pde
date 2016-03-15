
/*import ddf.minim.signals.*;
import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.effects.*;
*/
//space bunny named pong
//----------------------

//set up
//Minim minim;
//AudioPlayer sou;
  
boolean gameStart = false;
boolean[] ballActive = new boolean[3];
float bunny =  random(30,300);
int rectSize = 100;
int topColor = #96A6FF;
int bottomColor = #96A6FF;
int z = 100;
int dz = 1;
PImage img2;
PImage img1; 
PImage img;
float[] x= new float[3];
float[] y= new float[3];
float[]speedx= new float[3];
float[]speedy= new float[3];
int numberOfBalls;



void setup() {
  //minim = new Minim(this);
  //sou = minim.loadFile("bunny.mp3");
  //sou.loop();
  size(500, 500);
  noStroke();
  smooth();
   img1 = loadImage("galax.jpg"); //bg
   img = loadImage("bunny.png");  //bunhy
   ballActive[0]= true;
   ballActive[1]= false;
   ballActive[2]= false;
   numberOfBalls = 1;
   
   x[0] = 250; // start position of the ball 
   y[0] = 250;
   speedx[0] = random(3, 6);
   speedy[0] = random(3, 6);
  
}
 
void draw() {
  background(0);

  
  image(img1, -500, -500 ); //bg
  image(img, z, 100);        // bunny
  z= z +dz;
  
  if (z > 400) {
    dz= -1;
  }
   
  if (z<100) {
   dz=1;
  }
   
   for (int i = 0;  i< 3; i++) {
     
     if (ballActive[i]) {
     
                 fill(#96A6FF);
                 ellipse(x[i], y[i], 20, 20);
                 
                 if (gameStart) {
                x[i] = x[i] + speedx[i];
                y[i] = y[i] + speedy[i];
                 }
                // if ball hits movable bar, ball switch y direction and color changes applies
                 if ( y[i] > height-30 && x[i] < height -20 && x[i] > mouseX-rectSize/2 && x[i] < mouseX+rectSize/2 ){
                 speedy[i] = speedy[i] * -1;
                 y[i] = y[i] + speedy[i];
                 bottomColor = 255;     
                }
                //===
                 // if ball hits wall, change direction of Y
                else if (y[i] < 2) {
                  speedy[i] = speedy[i] * -1;
                  y[i] = y[i] + speedy[i];
                  topColor = 255;
                }
                else {    
                  topColor = #96A6FF;
                  bottomColor = #96A6FF;
                }
                // if ball hits up or down, change direction of X  
                if ( x[i] > width-10 || x[i] < 10 ) {
                  speedx[i] = speedx[i] * -1;
                  x[i] = x[i] + speedx[i];
                }
                   
            
                // resets things if you lose
                if (y[i] > height) {
                  numberOfBalls--;
                  ballActive[i]= false;
                  if(numberOfBalls==0){
                     gameStart = false;
                    numberOfBalls=1;
                    x[0]= 250;
                    y[0]= 250;
                    speedx[0] = random(3, 6);
                    speedy[0]= random(3, 6);
                    rectSize = 100;
                    ballActive[0] = true;
                    ballActive[1] = false;
                    ballActive[2] = false;
                    
                  }
                 
                }
                 
                 // if ball hits the bunny, magical things will happen!
                if (x[i]<=z+20 && x[i]>=z-20 && y[i]>=80 && y[i]<=120 ) {
                  println("hei");
                  img2 = loadImage("bunny_pink.png"); //pink bunny
                  image(img2, z, 100); 
                  //rectSize = rectSize-5;
                  //rectSize = constrain(rectSize, 10,100); 
                
                  if (numberOfBalls<3){
                    numberOfBalls++;
                    int newBall;
                    if(!ballActive[0]){
                      newBall=0;
                    }
                    else if (!ballActive[1]){
                        newBall=1;
                    }
                    else {
                        newBall=2;
                    } 
                    x[newBall] = z; // start position of the ball 
                    y[newBall] = 100;
                    speedx[newBall] = random(3, 6);
                    speedy[newBall] = random(3, 6);
                    ballActive[newBall]= true;
                   
                      
                
              }  
                  
                         
                      
                  
                }
                
        }
   
   }
  
 
    
    fill(topColor);          //big bar
    rect(0, 0, width, 20);
    fill(bottomColor);         //small movable bar
    rect (mouseX-rectSize/2, height-30, rectSize, 10);
 
  
  
}
void mousePressed() {
  gameStart = !gameStart;
     //balls.add(new Ball(random(width), random(height), random(20, 40), i, balls));
}
 



