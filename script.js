class Birb{

  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
  }

  draw() {
    fill(this.c);
    //noStroke();
    ellipse(this.x, this.y, this.w, this.h)
  
    //versnellen
    if(keyIsDown(32)){

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


var birb


function setup() {
  createCanvas(500, 500);

  birb = new Birb(50, 50, 20, 20, "yellow")

}

function draw() {
	background(225);  
  
  birb.draw();

}

