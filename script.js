class Birb{

  constructor(x, y, w, h, v, a, c, cd, mousePress) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.a = a;
    this.c = c; 
    this.cd = cd;
    this.mousePress = mousePress;
  }

  draw() {
    fill(this.c);
    //noStroke();
    rect(this.x, this.y, this.w, this.h)
    image(img, this.x, this.y, this.w, this.h);
    
    
    if (this.v < 15){
      this.v = this.v * this.a;
    }

    if (mousePress === true){
      this.cd = 8;
      this.v = 1;
    }

    if (this.cd > 0){
      this.y -= 10;
      this.cd -= 1;
    } else {
      this.y += this.v;
    }
    
    if (this.y > height - this.h || this.y < 0) {
      if (this.y > height - this.h) {
       this.y = height - this.h;
      } else if ( this.y < 0){
        this.y = 0;
      }
    }
  }
}

class Pipes {
  constructor(x, h, w, dis, c) {
    this.x = x;
    this.h = h;
    this.w = w;
    this.dis = dis;
    this.c = c;
    this.pipeStart = this.h + this.dis;
    this.pipeLength = height - this.pipeStart;
  }
  
  draw() {
    fill(this.c);
    //noStroke();
    
    rect(this.x, 0, this.w, this.h)
    rect(this.x, this.pipeStart, this.w, this.pipeLength)
    this.x -= 2;

  }
}

var pipes = [];
let img;

function preload(){
  img = loadImage('birb15.png');
  img2 = loadImage('background.jpg');
}

function setup() {
  createCanvas(500, 500);
  timer = 120;
  cd = 0
  dis = 175;
  mousePress = false;

  birb = new Birb(100, 50, 50, 50, 1, 1.05, "white", cd, mousePress)
  pipe = new Pipes(500, 150, 50, dis, "green")
  pipes.push(pipe);
}

function draw() {
	background(img2);  
  if (timer <= 0){
    let h = Math.floor(Math.random() * 350) + 1;
    pipe = new Pipes(500, h, 50, dis, "green")
    pipes.push(pipe);
    timer = 120;
  } else {
    timer -= 1;
  }
  
 
  birb.draw();
  pipes.forEach(pipe => pipe.draw());
  mousePress = false;
}

function mousePressed() {
  mousePress = true;
}
