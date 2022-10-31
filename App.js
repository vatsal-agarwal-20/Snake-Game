  let snakeVelocity={x:0,y:0};
  const foodSound=new Audio('../music/food.mp3');
  const gameOverSound=new Audio('../music/gameover.mp3');
  const moveSound=new Audio('../music/move.mp3');
  const musicSound=new Audio('../music/music.mp3');
  let speed=6;
  let lastPaintTime=0;
  let snakeArr=[{x: 13, y:15}];
  food= {x:8,y:12};
  let score=0;
  
  //Game Functions
  function main(currTime){
    window.requestAnimationFrame(main);
    //console.log(currTime);
    if((currTime-lastPaintTime)/1000 < 1/speed)
    {
        return; 
    }
    lastPaintTime=currTime;
    GameEngine();
  }

  function isCollide(snake)
  {
    // If you bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
      {
          return true;
      }
    }
    // If you bump into the wall
      if(snake[0].x>=20 || snake[0].x<=0 || snake[0].y>=20 || snake[0].y<=0)
      {
        return true;
      }
    
  }
  function GameEngine() {
    // Part 1: Updating the snake array and food
    if(isCollide(snakeArr))
    {
      
      gameOverSound.play();
      musicSound.pause();
      snakeVelocity={x:0,y:0};
      alert("Game Over! \nPress any key to play again.");
      snakeArr=[{x:13,y:15}];
      speed=6;score=0;
      scoreBox.innerHTML="Score: "+score;
      //musicSound.play();
      score=0;
    }
    // If you have eaten the food, increment the 
    // score and regenerate the food
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
      foodSound.play();
      ++score;
      if(score>hiscoreval)
      {
        hiscoreval=score;
        localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
        highScore.innerHTML="Highest Score: "+hiscoreval;
      }
      speed+=0.5;
      scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x: snakeArr[0].x + snakeVelocity.x ,
         y: snakeArr[0].y + snakeVelocity.y}); // array ke front pe addition

      let a =2;
      let b=18;
      food={x:Math.round(a+ (b-a)*Math.random()),
         y:Math.round(a+ (b-a)*Math.random())};

    }
    //Moving the snake
    for(let i= snakeArr.length-2; i>=0;i--)
    {
      snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;

    // Part 2: Display the snake and food
    
    //Display the Snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
       snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart=e.x;
       if(index===0)
       {
        snakeElement.classList.add('snakeHead');
       }
       else{
       snakeElement.classList.add('snake');
       }
       board.appendChild(snakeElement);
    })

    // Display the Food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

  //Main Logic Starts Here

  // Storing highest score in the local storage
  // so that it doesn't get reset after reloading the application
  let hiscore= localStorage.getItem("hiscore");
  if(hiscore===null)
  {
    hiscoreval=0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
  }
  else{
    hiscoreval = JSON.parse(hiscore);
    highScore.innerHTML="Highest Score: "+hiscore;
  }

  window.requestAnimationFrame(main);

  window.addEventListener('keydown',e=>{
    snakeVelocity= {x:0,y:1} //Start the game
    moveSound.play();
    musicSound.play();
    switch(e.key)
    {
      case "ArrowUp":
      //console.log("ArrowUp");
      snakeVelocity.x=0;
      snakeVelocity.y=-1;
      break;

      case "ArrowDown":
      //console.log("ArrowDown");
      snakeVelocity.x=0;
      snakeVelocity.y=1;
      break;

      case "ArrowLeft":
      //console.log("ArrowLeft");
      snakeVelocity.x=-1;
      snakeVelocity.y=0;
      break;

      case "ArrowRight":
      //console.log("ArrowRight");
      snakeVelocity.x=1;
      snakeVelocity.y=0;
      break;

      default:
      break; 
    }

  })

  



