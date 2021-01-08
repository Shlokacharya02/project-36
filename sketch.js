//Create variables here
var dog,happyDog,dogImg,happyDogImg,database,foodS,foodStock;
var fedTime,lastFed,feed,addFood,foodObj;


function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");

}

function setup() {
  createCanvas(500, 500);

 
  database = firebase.database();
  foodObj = new Food();
  dog = createSprite(300,300,10,10);
  dog.scale = 0.2;
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() { 
  background(46,139,87);
  
  foodObj.display();
  
  fedTime = database.ref("feed time");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

fill("white");
textSize(15);
if(lastFed>=12){
  text("Last Feed: "+ lastFed % 12 + " PM",350,30);
}
else if(lastFed == 0){
  text("Last Feed: 12AM" ,350,30);
}
else{
  text("Last Feed: "  + lastFed +" AM",350,30);
}
 


  

  drawSprites();
  //add styles here

  
 



}

function readStock(data){


  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDogImg);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    Food : foodObj.getFoodStock(),
    FeedTime: hour()
  })
}

function addFoods(){
  foodS ++ 
  database.ref("/").update({
    Food: foodS
  })
}





