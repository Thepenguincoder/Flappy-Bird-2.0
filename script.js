class Birb{
  
  constructor(x, y, w, h, v, a, c, im) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.v = v;
    this.a = a;
    this.c = c; 
    this.cd = 0;
    this.im = im;
  }

  flap(){
    this.cd = 7;
    this.v = 1;
    flap.play()
  }

  draw() {
    fill(this.c);
    //noStroke();
    //rect(this.x, this.y, (this.w -5), (this.h-5));
    
    image(this.im, this.x, this.y, this.w, this.h);
    
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
      gameState = 2
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
    this.v = 2;
    this.q = Math.round(Math.random()) * 2 - 1;
  }

  draw() {

      fill(this.c);
    //noStroke();
    if (hardMode == true){
      

      if (this.h <= this.v){
        this.v = this.v * -1;
      } else if (this.h >= (500 - dis)){
        this.v = this.v * -1;
        this.h = 500 - dis;
      }
      this.h += this.v * this.q
    } 

    this.pipeStart = this.h + this.dis;
    this.pipeLength = height - this.pipeStart;
    image(img2, this.x, 0, this.w, this.h)
    image(img2, this.x, this.pipeStart, this.w, this.pipeLength)
    
    if (hardMode == true){
      this.x -= 5;
    }else{
      this.x -= 2;
    } 
  } 
}

class Life {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
  }

  draw() {
    image(img7, this.x, this.y, this.w, this.h);

    if (hardMode == true){
      this.x -= 5;
    }else{
      this.x -= 2;
    } 
  } 
}

function preload(){
  img1 = loadImage('imgs/birb21.png');
  img2 = loadImage('imgs/treeTrunk.jpg');
  img3 = loadImage('imgs/forest-day.png');
  img4 = loadImage('imgs/youWinPixelArt.jpg');
  img5 = loadImage('imgs/deathScreen.jpg');
  img6 = loadImage('imgs/startscreen.jpg');
  img7 = loadImage('imgs/McEgg.png')
  img8 = loadImage('imgs/birb21forward.png')
  img9 = loadImage('imgs/birb21upsidedown.png')
  flap = loadSound('sounds/flap.mp3');
  song = loadSound('sounds/shovelknight.mp3');
}

var highscore = 0, gameStop = false, gameStart = false, gameWon = false, pipeCounter = 0, score = 0, pipes = [], hardMode = false, extraLives = 0,  gotLife = false, gameState = 0;

function setup() {
  flap.setVolume(5);
  song.setVolume(0.1);
  song.loop();
  createCanvas(500, 500);
  timer = 30;
  lifeTimer = 0
  dis = 150; 
  gameWinLength = 25;
  hardMode = false;
  birb = new Birb(100, 150, 50, 50, 1, 1.05, "white", img1)
  life = new Life(0, 0, 1, 1)
}

function newGame() {
  pipeCounter = 0
  score = 0
  extraLives = 0
  pipes = []
  //highsocre = getItem("highscore")
  //if (highscore == null){
    //highscore = 0
  //}
  birb = new Birb(100, 150, 50, 50, 1, 1.05, "white", img1)
  life = new Life(0, 0, 1, 1)
}

function draw() {
  if (gameState == 0){
    gameStartMenu()
  } else if (gameState == 1){
    mainGame()
  } else if(gameState == 2) {
    gameLostMenu()
  } else if (gameState == 3){
    gameWonMenu()
  }
}

function getPipes(){
  if (timer <= 0 && pipeCounter < gameWinLength){
    let h = Math.floor(Math.random() * 300) + 25;
    pipe = new Pipes(500, h, 50, dis, "green")
    pipes.push(pipe);
      if (hardMode == true){
        timer = 60;
      }else{
        timer = 120;
      }
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

function getLives(){

  if (pipeCounter >= 5  &&  (pipeCounter % 5) == 0 ){
    gotLife = false
    let y = Math.floor(Math.random() * 300) + 25;
    life = new Life((width + 120), y, 50, 50)
  }

  lifeTimer -= 1
    
  if(lifeTimer <= 0){
    
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

function isHit(){
  for (let i = 0; i < pipes.length; i++){
    thisPipe = pipes[i]
    if (thisPipe.x <= (birb.x + (birb.w-5)) && thisPipe.x >= (birb.x - birb.w)){
      if (birb.y <= thisPipe.h || (birb.y + (birb.h-5)) >= thisPipe.pipeStart){
        if (extraLives >= 1){
          pipes.splice(i, 1)
          extraLives -= 1
        } else {
          gameState = 2
        }
      }
    }
  }
  if (gotLife == false && life.x <= (birb.x + birb.w) && life.x >= (birb.x - birb.w)) {
    if (birb.y <= (life.y + life.h) && (birb.y + birb.h) >= life.y){
      extraLives += 1
      gotLife = true
      //rect(400,50,100,100)
    }
  }
}

function mainGame(){
  background(img3);  
  getPipes();
  getLives();
  isHit()
  getScore()
  textSize(32)
  
  birb.draw();
  if (gotLife == false){
    life.draw();
  }
  pipes.forEach(pipe => pipe.draw());
  fill("black")
  text("Score: " + score, 250, 50, "black")
  text("Lives: " + extraLives, 50, 50, "black")
}

function gameStartMenu(){
  background(img6)
  textSize(32)
  //fill(255)
  fill("black")
  text("Press space to start", 70, 400)
  
  if(hardMode == false){
    text("Press E for extreme difficulty", 70, 450)
  } else{
      text("Press N for normal difficulty", 70, 450)
    }
}

function gameLostMenu(){
  background(img5)
  textSize(32)
  fill(255)
  if (score > highscore){
    highscore = score;
  }
  text("Press space to retry", 100, 450)
  text("Score: " + score, 160, 50)
  text("Highscore: " + highscore, 160, 100)
  
  if(hardMode == false){
    text("Press E for extreme difficulty", 60, 400)
  } else{
      text("Press N for normal difficulty", 60, 400)
    }
}

function gameWonMenu(){
  background(img4)
  textSize(32)
  fill(255)
  text("Press space to restart", 90, 420)
  if (score > highscore){
    highscore = score;
  }
  text("Score: " + score, 100, 50)
  text("Highscore: " + highscore, 100, 100)
}

function mousePressed() {
  if (gameState == 1){
    birb.flap();
  } 
}

function keyPressed(){
  if (keyCode == 32 || keyCode == 13) {
    if (gameState == 0){
      gameState = 1
      //storeItem("highscore", highscore);
      newGame()
    } else if (gameState == 2){
      gameState = 1
      newGame()
    } else if (gameState == 3){
      gameState = 1
      //storeItem("highscore", highscore);
      newGame()
    } 
  } 

  if (keyCode == 69 && gameState != 1) {
    hardMode = true
  } 
  
  if (keyCode == 78 && gameState != 1) {
    hardMode = false
  } 

  if (keyCode == 81 && gameState == 1) {
    if (hardMode == true) {
      hardMode = false
    } else {
      hardMode = true
    }
  }
}