class Birb{

  constructor(x, y, w, h, v, a, c, cd) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.a = a;
    this.c = c; 
    this.cd = cd;
  }


  draw() {
    fill(this.c);
    //noStroke();
    ellipse(this.x, this.y, this.w, this.h)
    
    if (this.v < 10){
      this.v = this.v * this.a;
    }

    

    if (this.cd == 0){
      if (keyIsPressed === true && keyCode === 32) {
        this.cd = 10 ;
        this.v = 1;
      }
    }
    
    if (this.cd > 0){
      
      if (this.cd > 5) {
        this.y -= 10;
      }

      this.cd -= 1
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


var birb, by


function setup() {
  createCanvas(500, 500);
  cd = 0
  birb = new Birb(100, 50, 20, 20, 1, 1.05, "yellow", cd)

}

function draw() {
	background(225);  
  
  
  birb.draw();

}

//function keyPressed() {
  //if (keyCode === UP_ARROW) {
    //by -= 20;
  //}
  //return false;
//}
