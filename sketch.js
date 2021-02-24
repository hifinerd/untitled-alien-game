
var leftPaddle, middlePaddle, rightPaddle, ball
var gameState = "serve"
//gameState = serve: life lost or game started
//gameState = play: ball served
//gameState = over: lost all lives
var alienGroup, alien, score = 0, chain = 1

function setup() {
  createCanvas(600,800);
  edges=createEdgeSprites();
  middlePaddle = createSprite(300,750,33,20)
  leftPaddle = createSprite(267,750,33,20) 
  rightPaddle = createSprite(333,750,33,20)
  ball = createSprite(300,725,25,25)
  alienGroup = new Group()
  ball.shapeColor = "red"
}

function draw() {
  background(0);
  text("Score:"+score, 50,50)
  text("Chain:"+chain, 520,41)  
  if(keyDown("right")){
    leftPaddle.x = leftPaddle.x+ chain * 5
    middlePaddle.x = middlePaddle.x+chain * 5
    rightPaddle.x = rightPaddle.x+chain * 5
  }
  if(keyDown("left")){
    leftPaddle.x = leftPaddle.x-chain * 5
    middlePaddle.x = middlePaddle.x-chain * 5
    rightPaddle.x = rightPaddle.x-chain * 5
  }
  if (keyDown("space") && gameState === "serve") {
    ball.velocityY = -10;
    ball.velocityX = 4
    gameState = "play";
  }
  //make the ball bounce off the user paddle
  if(ball.isTouching(middlePaddle)){
    ball.bounceOff(middlePaddle)
  }
  if(ball.isTouching(leftPaddle)){
    ball.velocityX = ball.velocityX + 5
    ball.bounceOff(leftPaddle)
    
  }
  if(ball.isTouching(rightPaddle)){
    ball.bounceOff(rightPaddle)
    ball.velocityX = ball.velocityX - 5
  }
  //make the ball bounce off the top and bottom walls
  if (ball.isTouching(edges[0]) || ball.isTouching(edges[1]) || ball.isTouching(edges[2])) {
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
  }
 /* if (paddle.isTouching(edges[0]) || paddle.isTouching(edges[1]) || paddle.isTouching(edges[2])) {
    paddle.bounceOff(edges[0]);
    paddle.bounceOff(edges[1]);
    paddle.bounceOff(edges[2]);
  }*/
 /* if (alienGroup.isTouching(ball)){
    alienGroup.destroyEach()
  }*/
  for(var i=0;i<alienGroup.length;i++){
    if(alienGroup[i].isTouching(ball)){
      alienGroup[i].destroy();
      score = score + 10 * chain
      chain = chain + 1
      ball.velocityY = ball.velocityY + chain
      ball.velocityX = ball.velocityX + chain
    }
  }

  if (alienGroup.isTouching(edges[0]) || alienGroup.isTouching(edges[1]) || alienGroup.isTouching(edges[2]) || alienGroup.isTouching(edges[3])) {
    alienGroup.bounceOff(edges[0]);
    alienGroup.bounceOff(edges[1]);
    alienGroup.bounceOff(edges[2]);
    alienGroup.bounceOff(edges[3]);
  }
  if (ball.y > 810){
    ball.x = 300
    ball.y = 725
    ball.velocityX = 0
    ball.velocityY = 0
    chain = 1
    gameState = "serve"}
  spawnAliens();
  drawSprites();
  console.log(alienGroup)
}
function spawnAliens(){
  if (frameCount % 60 === 0){
   alien = createSprite(300,300,20,20);
    
     //generate random obstacles                                                                                   
     var randX = Math.round(random(1,10));
     var randY = Math.round(random(1,10));
     alien.velocityX = randX
     alien.velocityY = randY;
     alienGroup.add(alien); 
     alien.lifetime = 500
     }
    
    //add each obstacle to the group

  }
 