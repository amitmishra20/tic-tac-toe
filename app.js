let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let newGameButton = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turn0= true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
]

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () =>{
        if (turn0){ //Player O
            box.innerText = "O";
            box.style.color = "#0582CA";
            turn0 = false;
        }
        else{ //player X
            box.innerText = "X";
            box.style.color = "#003554";
            turn0 = true;
        }
        box.disabled = true;
        count++;

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratualtions, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const showDraw = () => {
    msg.innerText = "Game Draw!";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner =() => {
    let winnerFound = false;

    for(let pattern of winPatterns){
        // console.log(pattern[0], pattern[1], pattern[2]);
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != ""&& pos2val != ""&& pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                winnerFound = true;
                showWinner(pos1val);
                return;
            }
        }
    }
    if(count === 9 && !winnerFound){
        showDraw();
    }
}

newGameButton.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);