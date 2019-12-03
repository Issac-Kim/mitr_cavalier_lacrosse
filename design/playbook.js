
var dragging = false; 
var rollover = false; 

var x, y, w, h;       
var offsetX, offsetY;    

function setup(){
    let canvas = createCanvas(600, 400);
    canvas.parent("playbook-container");
    // set the background to the image 
    bg = loadImage("resources/pictures/field.jpg");
    // used to set the number of each type of icon available to the user 
    let players = 10;
    let opponents = 10;
    player = createButton('Add Player');
    player.position(0, 0);
    player.mousePressed(addP);
    opponent = createButton('Add Opponent');
    opponent.position(150,0);
    opponent.mousePresses(addO);
    // Starting location
    x = 100;
    y = 100;
    // Dimensions
    w = 75;
    h = 50;
}

function draw(){
    background(bg);
      // Is mouse over object
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rollover = true;
  } 
  else {
    rollover = false;
  }
  
  // Adjust location if being dragged
  if (dragging) {
    x = mouseX + offsetX;
    y = mouseY + offsetY;
  }

  stroke(0);
  // Different fill based on state
  if (dragging) {
    fill (50);
  } else if (rollover) {
    fill(100);
  } else {
    fill(175, 200);
  }
  rect(x, y, w, h);
}


function mousePressed() {
  // Did I click on the rectangle?
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    dragging = true;
    // If so, keep track of relative location of click to corner of rectangle
    offsetX = x-mouseX;
    offsetY = y-mouseY;
  }
}

function mouseReleased() {
  // Quit dragging
  dragging = false;
}

function addP(){
    let val = 1;
};

function addO(){
    let val = 1;
}





class icon{
    // icon is the parent class for the different items that can be placed by the used 
    // the constructor will take parameters for the position, direction, color, and size of the icon 
    constructor(x, y, dir, r, g, b, scale){
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.r = r;
        this.g = g;
        this.b = b;
        this.scale = scale;
    }
}