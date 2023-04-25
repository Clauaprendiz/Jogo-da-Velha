const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");

let isCircleTurn

const winningMessageText = document.querySelector("[dataWinning]")

const winningMessage = document.querySelector("[dataMessage")

const restart = document.querySelector("[dataRestart]")




const winning = [
    [0, 1, 2],
    [0, 3, 6],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]



function startGame() {
    for (const cell of cellElements) {
        cell.classList.remove("x");
        cell.classList.remove("circle");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }


    setBoardHover();

    winningMessage.classList.remove("showWinningMessage");

}

const endGame = (isDraw) => {
    if(isDraw){
        winningMessageText.innerText = "Empate!"
    } else{
        winningMessageText.innerText = isCircleTurn ? "O Venceu!" : "X Venceu!"
    }

    winningMessage.classList.add("showWinningMessage")
}



const checkForWin = (currentPlayer) => {
    return winning.some(combination => {
        return combination.every((index => {
            return cellElements[index].classList.contains(currentPlayer);
        }));
    });
}

function draw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains("x") || cell.classList.contains("circle")
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
  
};

function setBoardHover(){
    board.classList.remove("circle");
    board.classList.remove("x");
    

    if (isCircleTurn) {
        board.classList.add("circle");
    } else{
        board.classList.add("x");
    }
} 

const swapTurns = () =>{
    isCircleTurn = !isCircleTurn;
    
    setBoardHover()
}

const handleClick = (e) => {
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    const isWin = checkForWin(classToAdd)

    const isDraw = draw()

    if(isWin) {
        endGame(false)
    } else if (isDraw) {
        endGame(true)
    } else {
        swapTurns()        
    }

    

  

}

startGame()

restart.addEventListener('click', startGame)



