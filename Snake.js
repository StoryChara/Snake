let scl = 20, rows, cols, snake, food, score, font;

function preload() {
  font = loadFont('Tiny5-Regular.ttf')
}

function setup(){
  const canvas = createCanvas(400,400);
  canvas.parent('canvas-container');
  frameRate(10);
  
  rows = floor(height / scl) - 1;
  cols = floor(width / scl);
  
  snake = new Snake();
  food = new Food();
  
  score = 0;
}

function draw() {
  background(150, 192, 4);
  drawGrid();
  
  fill(0, 10, 18);
  rect(0, 0, height, 20);
  
  fill(255);
  textSize(25);
  textFont(font);
  text("Score: " + str(score), 0, 20);
  
  translate(0, scl);
  
  snake.update();
  snake.show();
  
  food.update();
  food.show();
}

function drawGrid() {
  stroke(150, 50);
  for (let i = 1; i <= cols; i++) { 
    line(i * scl, 0, i * scl, height);
  }
  for (let j = 0; j <= rows; j++) { 
    line(0, j * scl, width, j * scl);
  }
}


function keyPressed(){
 if (keyCode === UP_ARROW){
   snake.setDirection(0, -1);
 } else if (keyCode === DOWN_ARROW){
   snake.setDirection(0, 1);
 } else if (keyCode === LEFT_ARROW){
   snake.setDirection(-1, 0);
 } else if (keyCode === RIGHT_ARROW){
   snake.setDirection(1, 0);
 } else if (key == 'r' || key == 'R'){
   snake = new Snake();
   score = 0;
   loop();
 }
}

class Snake {
  
  constructor(){
    this.head = createVector(0, 0);
    this.dir = createVector(1, 0);
    this.length = 0;
    this.tail = [];
  }
  
  setDirection(x, y){
    if (this.dir.x != -x && this.dir.y != -y) {
      this.dir = createVector(x, y);
    }
  }
  
  eat(){
    if (this.head.x === food.position.x &&
       this.head.y === food.position.y) {
      this.length++;
      food = new Food();
      
      score += 100;
    }
  }
  
  isDeath(){
    if (this.head.x < 0 || this.head.x >= cols ||
       this.head.y < 0 || this.head.y >= rows){
      return true;
    }
    
    for (const pos of this.tail){
      if (this.head.x === pos.x &&
          this.head.y === pos.y) {
        return true;
      }
    }
    
    return false;
  }
  
  update(){
    if (this.isDeath()){
      noLoop();
    }
    
    this.tail.push(createVector(this.head.x, this.head.y));
    // push -> pop
    
    this.head.add(this.dir);
    this.eat();
    
    if (this.tail.length > this.length){
      this.tail.shift(); // unshift -> shift
    }
  }
  
  show(){
    fill(0, 10, 18);
    rect(this.head.x * scl,
        this.head.y * scl,
        scl, scl);
    
    for (const pos of this.tail){
      rect(pos.x * scl,
        pos.y * scl,
        scl, scl);
    }
  }
  
}

class Food {
  constructor(){
    this.position = createVector(
      floor(random(cols)),
      floor(random(rows))
    );
  }
  
  update(){
    // Nothing
  }
  
  show(){
    fill(0, 10, 18);
    circle(this.position.x * scl + scl/2,
           this.position.y * scl + scl/2,
           scl);
  }
}
