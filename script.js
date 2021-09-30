class Birb{
  
  constructor(x, y, w, h, v, a, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.a = a;
    this.c = c; 
    this.cd = 0;
  }

  flap(){
    this.cd = 7;//should be 8
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

    if ((this.y + this.h) >= 500){
      gameStop = true
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
    
    image(img2, this.x, 0, this.w, this.h)
    image(img2, this.x, this.pipeStart, this.w, this.pipeLength)
    this.x -= 2;
  } 
}



function preload(){
  img1 = loadImage('imgs/birb21.png');
  img2 = loadImage('imgs/treeTrunk.jpg');
  img3 = loadImage('imgs/forest-day.png');
  img4 = loadImage('imgs/youWinPixelArt.jpg');
  img5 = loadImage('imgs/deathScreen.jpg');
  img6 = loadImage('imgs/startscreen.jpg');
  flap = loadSound('sounds/flap.mp3');
  song = loadSound('sounds/shovelknight.mp3');
}

var highscore = 0, gameStop = false, gameStart = false, gameWon = false, pipeCounter = 0, score = 0, pipes = [], birb = new Birb(100, 50, 50, 50, 1, 1.05, "white")

function setup() {
  flap.setVolume(2);
  song.setVolume(0.1);
  song.loop();
  createCanvas(500, 500);
  timer = 30;
  dis = 150; 
  gameWinLength = 2
}

function newGame() {
  pipeCounter = 0
  score = 0
  pipes = []
  //highsocre = getItem("highscore")
  //if (highscore == null){
    //highscore = 0
  //}
  gameStop = false
  gameStart = false
  gameWon = false

  birb = new Birb(100, 50, 50, 50, 1, 1.05, "white")
}

function draw() {
  if (gameStop == false && gameStart == true && gameWon == false){
    mainGame()
  } else if (gameStart == false){
    gameStartMenu()
  } else if(gameStop == true) {
    gameLostMenu()
  } else if (gameWon == true){
    gameWonMenu()
  }
}



function mousePressed() {
  if (gameStop == false && gameStart == true && gameWon == false){
    birb.flap();
  } 
}

function keyPressed(){
  if (gameStop == true){
    gameStop = false
    //storeItem("highscore", highscore);
    newGame()
  } 
  if (gameStart == false){
    gameStart = true
    pipes = []
  }
  if (gameWon == true){
    gameWon = false
    //storeItem("highscore", highscore);
    newGame()
  } 
}

function isHit(){
  for (let i = 0; i < pipes.length; i++){
    thisPipe = pipes[i]
    if (thisPipe.x <= (birb.x + birb.w) && thisPipe.x >= (birb.x - birb.w)){
      if (birb.y <= thisPipe.h || (birb.y + birb.h) >= thisPipe.pipeStart){
        gameStop = true
      }
    }
  }
}

function getScore(){
  for (let i = 0; i < pipes.length; i++){
    thisPipe = pipes[i]
    if (thisPipe.x == 100){
      score += 1
    }
  }
}

function getPipes(){
  if (timer <= 0 && pipeCounter < gameWinLength){
    let h = Math.floor(Math.random() * 300) + 25;
    pipe = new Pipes(500, h, 50, dis, "green")
    pipes.push(pipe);
    timer = 120;
    pipeCounter += 1;
  } else if (pipeCounter >= gameWinLength && pipe.x == -50){
    gameWon = true
  } else {
    timer -= 1;
  }

  if (pipes.length >= 5) {
    pipes.splice(0,1)
  }
}



function mainGame(){
  background(img3);  
  getPipes();

  isHit()
  getScore()
  textSize(32)
  fill("black")
  text(score, 250, 50, "black")

  birb.draw();
  pipes.forEach(pipe => pipe.draw());

}

function gameStartMenu(){
  background(img6)
  textSize(32)
  //fill(255)
  fill("black")
  text("Press any key to start", 95, 400)
}

function gameLostMenu(){
  background(img5)
  textSize(32)
  fill(255)
  if (score > highscore){
    highscore = score;
  }
  text("Press any key to retry", 100, 400)
  text("Score: " + score, 160, 50)
  text("Highscore: " + highscore, 160, 100)
}

function gameWonMenu(){
  background(img4)
  textSize(32)
  fill(255)
  text("Press any key to restart", 90, 420)
  if (score > highscore){
    highscore = score;
  }
  text("Score: " + score, 100, 50)
  text("Highscore: " + highscore, 100, 100)
}


