function setup(){
    let canvas = createCanvas(400, 400);
    canvas.parent("playbook-container");
    // set the background to the image 
    bg = loadImage("resources/pictures/field.jpg");
    // used to set the number of each type of icon available to the user 
    let players = 10;
    let opponents = 10;
    let new_player = document.getElementById("player");
    let new_opponent = document.getElementById("opponent");
}


function draw(){
    background(bg);

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