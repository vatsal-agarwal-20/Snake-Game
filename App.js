function App() {

  let direction={x:0,y:0};
  const foodSound=new Audio('../music/food.mp3');
  const gameOverSound=new Audio('../music/gameover.mp3');
  const moveSound=new Audio('../music/move.mp3');
  const musicSound=new Audio('../music/music.mp3');
  let speed=2;
  let lastPaintTime=0;
  
  //Game Functions
  function main(currTime){
    window.requestAnimationFrame(main);
    console.log(currTime);
    if((currTime-lastPaintTime)/1000 < 1/speed)
    {
        return; 
    }
    lastPaintTime=currTime;
    GameEngine();
  }
  function GameEngine() {
    let snakeArr=[{x: 13, y:15}];
    // Part 1: Updating the snake array and food
    let boardElement= document.getElementsById('board');
    boardElement.innerHTML="";
    snakeArr.forEach((e,index)=>{
       let snakeElement=document.createElement('div');
       snakeElement.style.gridRowStart = e.y;
       snakeElement.style.gridColumnStart=e.x;
       snakeElement.classList.add('food');
       boardElement.appendChild(snakeElement);
    })

    // Part 2: Display the snake and food
  
}

  //Main Logic Starts Here
  window.requestAnimationFrame(main);

  return (
    <div className="container">
      <div id="board">

      </div>
    </div>
  );
}


