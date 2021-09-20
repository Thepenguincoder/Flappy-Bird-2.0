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
    
    if (this.v < 10){
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



function setup() {
  createCanvas(500, 500);
  cd = 0
  mousePress = false;
  birb = new Birb(100, 50, 20, 20, 1, 1.05, "yellow", cd, mousePress)
  
}

function draw() {
	background(225);  
  
  
  birb.draw();
  mousePress = false;
}

function mousePressed() {
  mousePress = true;
}
