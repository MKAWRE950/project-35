var balloon,ballonImage;
var Background,backgroundImage;
var database;
var position;

function preload(){
  backgroundImage = loadImage("Hot Air Ballon-01.png")
  ballonImage = loadAnimation("Hot Air Ballon-02.png,Hot Air Ballon-03,Hot Air Ballon-04.png")
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  balloon = createSprites(250,250)
  balloon = addAnimation(ballonImage);

  Background = addImage(backgroundImage);

  var ballPosition = database.ref('ball/position')
    ballPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImage);  

  text("use arrow keys to move hot air balloon!")

  if(keyDown(LEFT_ARROW)){
    changePosition(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
    changePosition(1,0);
}
else if(keyDown(UP_ARROW)){
    changePosition(0,-1);
}
else if(keyDown(DOWN_ARROW)){
    changePosition(0,+1);
}

  drawSprites();
}

function readHeight(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("errorMessage");
}

function updateHeight(x,y){
  database.ref('balloon/position').set({
      x:position.x+x,
      y:position.y+y
  })
  
}