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


  flap(){
    this.cd = 8;
    this.v = 1;
    flap.play()
  }

  draw() {
    fill(this.c);
    //noStroke();
    //rect(this.x, this.y, this.w, this.h);
    
    image(img1, this.x, this.y, this.w, this.h);
    
    
    if (this.v < 15){
      this.v = this.v * this.a;
    }



    if (mousePress === true){
      this.cd = 6;
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

  //collision(){
    //if (this.x >= 50 && this.x <= 250) {
      //return true
    //} else {
      //return false
    //}
  //}
  
  draw() {
    fill(this.c);
    //noStroke();
    
    image(img2, this.x, 0, this.w, this.h)
    image(img2, this.x, this.pipeStart, this.w, this.pipeLength)
    this.x -= 2;
  } 
}

var pipes = [];

function preload(){
  img1 = loadImage('imgs/birb21.png');
  img2 = loadImage('imgs/treeTrunk.jpg');
  img3 = loadImage('imgs/forest-day.png');
  flap = loadSound('sounds/flap.mp3');
  //song = loadSound('sounds/ofortuna.mp3');
}

function setup() {
  flap.setVolume(10);
  //song.loop();
  createCanvas(500, 500);
  timer = 120;
  dis = 150;
  cd = 0
  h = 0
  mousePress = false;
  gameStop = false


  birb = new Birb(100, 50, 50, 50, 1, 1.05, "white", cd, mousePress)
  pipe = new Pipes(500, 150, 50, dis, "green")
  pipes.push(pipe);
}




function draw() {
  if (gameStop == false){
    mainGame()
  } else{
    background(img1)
  }
}




function mousePressed() {
  if (gameStop == false){
    birb.flap();
  }
    
}

function isHit(){
  for (let i = 0; i < pipes.length; i++){
    thisPipe = pipes[i]
    if (thisPipe.x <= (birb.x + birb.w) && thisPipe.x >= (birb.x - birb.w)){
      if (birb.y <= thisPipe.h || (birb.y + birb.h) >= thisPipe.pipeStart){
        rect(50,50,50,50)
        gameStop = true
      }
    }
      
    //}
    //if (thisPipe.collision()){
      //rect( 450,50,50,50)
    //}
    
  }
}


function mainGame(){
  background(img3);  
  if (timer <= 0){
    let h = Math.floor(Math.random() * 300) + 25;
    pipe = new Pipes(500, h, 50, dis, "green")
    pipes.push(pipe);
    timer = 120;
  } else {
    timer -= 1;
  }

  if (pipes.length >= 5) {
    pipes.splice(0,1)
  }
  

  isHit()


  birb.draw();
  pipes.forEach(pipe => pipe.draw());
  mousePress = false;
}
