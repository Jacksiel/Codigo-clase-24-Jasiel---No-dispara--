const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
var balls = [];

//ejemplos de matríz
var arr=[1,2,3]
console.log(arr)

//matríz con diferentes tipos de datos
var arr2=['name', 1, true]
console.log(arr2)

//matríz con una lista de matrices
var arr3 = [[1,2], [3,4], [5,6]]
console.log(arr3)

arr3.push('my name')
console.log(arr3)

arr3.pop()
console.log(arr3)

//acceso a los primeros alementos de la matríz
console.log(arr3[0])

//acceso al segundo elemento del primer elemento de la matríz
console.log(arr3[0][1])

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle=15;

  var options = {isStatic: true}

  ground = Bodies.rectangle(0, height - 1, width * 2, 1, options);
  World.add(world, ground);

  tower = Bodies.rectangle(160, 350, 160, 310, options);
  World.add(world, tower);

  cannon = new Cannon(180, 110, 130, 100, angle);
  cannonBall = new CannonBall(cannon.x, cannon.y);

}

function draw() {
  image(backgroundImg,0,0,1200,600);
  Engine.update(engine);

  
  rect(ground.position.x, ground.position.y, width * 2, 1);
  

  push();
  imageMode(CENTER);
  image(towerImage,tower.position.x, tower.position.y, 160, 310);
  pop();  

  cannon.display();
  cannonBall.display();
}

function keyPressed(){
  if (keyCode === DOWN_ARROW){
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}


function showCannonBalls(ball,i){

  if(ball){

    ball.display();
  }

  for (var i = 0; i < balls.length; i++){
    showCannonBalls(balls[i],i);
  }
  
}

function keyReleased(){
  if(keyCode === DOWN_ARROW){
    balls[balls.length - 1].shoot();
  }
}