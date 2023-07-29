const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea");
startScreen.addEventListener("click",start);
document.addEventListener("keydown",pressOn);
document.addEventListener("keyup",pressOff);
let player = {speed : 15 , score : 0 ,enspd : 20,linspd :10};
let keys = {ArrowUp:false, ArrowDown:false,ArrowRight:false,ArrowLeft:false};

function moveLines(){
  let lines = document.querySelectorAll(".line");
  lines.forEach(function(item){

  if(item.y >= 750){
    item.y -= 900;
  }
  item.y += player.linspd;
  item.style.top = item.y + "px";
  })
}

function isCollide(a,b){
  let aRect = a.getBoundingClientRect();
  let bRect = b.getBoundingClientRect();
  return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) || (aRect.left > bRect.right))
}

function moveEnemy(car){
  let ele = document.querySelectorAll(".enemy");
  ele.forEach(function(item){
    if(isCollide(car,item)){
      console.log("Hit")
      endGame();
    }
    if(item.y > 1500){
      item.y = -700;
      item.style.left = Math.floor(Math.random()*350) + "px"
      item.style.backgroundColor = randomColor();
    }
    item.y += player.enspd;
    item.style.top = item.y + "px";
  })  
}

function playGame(){
  let car = document.querySelector(".car");
  moveLines();
  moveEnemy(car);
  let road = gameArea.getBoundingClientRect();
  if(player.start){
    if(keys.ArrowUp && player.y > road.top){player.y -= player.speed}
    if(keys.ArrowDown && player.y < road.bottom-150 ){player.y += player.speed}
    if(keys.ArrowLeft && player.x > 0){player.x -= player.speed}
    if(keys.ArrowRight && player.x < (road.width-50)){player.x += player.speed}
    car.style.left = player.x+"px";
    car.style.top = player.y+"px";

    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = "SCORE : " + player.score;
  }

}

function pressOn(e){
  e.preventDefault();
  keys[e.key] = true;
}


function pressOff(e){
  e.preventDefault();
  keys[e.key] = false;
}

function endGame(){
  player.start = false;
  score.innerHTML = "Game Over <br> Score was " + player.score;
  startScreen.classList.remove("hide");
}

function start(){
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(playGame)
  for(i = 0; i < 10; i++){
    let div = document.createElement("div");
    div.classList.add("line")
    div.y = i*150;
    div.style.top = (i*150) + "px";
    gameArea.appendChild(div);
  }
  let car = document.createElement("div");
  car.setAttribute("class","car")
  car.innerText = "YOU"
  gameArea.appendChild(car);
  player.x = car.offsetLeft;
  player.y = car.offsetTop;
  for(i = 0; i < 4; i++){
    let enemy = document.createElement("div");
    enemy.classList.add("enemy");
    enemy.y = ((i+1)*600)*-1;
    enemy.style.top = enemy.y + "px";
    enemy.innerText = (i+1)
    enemy.style.left = Math.floor(Math.random()*350) + "px";
    enemy.style.backgroundColor = randomColor();
    gameArea.appendChild(enemy);

  }
 }
 function randomColor(){
  return "#" + Math.random().toString(16).substr(-6);
 }