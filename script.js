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
    ellipse(this.x, this.y, this.w, this.h)
    
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
    
    if (this.y > height - (this.h / 2)|| this.y < (this.h/2)) {
      if (this.y > height - (this.h/2)) {
       this.y = height - (this.h/2);
      } else if ( this.y < (this.h/2)){
        this.y = (this.h/2);
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
    pipeStart = this.h + this.dis;
    pipeLength = height - pipeStart;
  }
  
  draw() {
    fill(this.c);
    //noStroke();
    
    rect(this.x, 0, this.w, this.h)
    rect(this.x, pipeStart, this.w, pipeLength)
  }
}



function setup() {
  createCanvas(500, 500);

  cd = 0
  pipeStart = 0
  pipeLength = 0
  mousePress = false;

  birb = new Birb(100, 50, 20, 20, 1, 1.05, "yellow", cd, mousePress)
  pipe = new Pipes(250, 150, 50, 100, "green")
  
}

function draw() {
	background(225);  
  
  
  birb.draw();
  pipe.draw();
  mousePress = false;
}

function mousePressed() {
  mousePress = true;
}
