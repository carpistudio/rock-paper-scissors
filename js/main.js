let options = ["rock", "paper", "scissors"];

let playerSelection;
let computerSelection;

let buttons = document.querySelectorAll(".buttons img");
for (const button of buttons) {
    button.addEventListener("click", buttonPressed);
}

let imgPlayer = document.querySelector(".images__player");
let imgComputer = document.querySelector(".images__computer");

let scorePlayerContainer = document.querySelector(".scores__player span");
let scoreComputerContainer = document.querySelector(".scores__computer span");
let scorePlayer = 0;
let scoreComputer = 0;
scorePlayerContainer.innerHTML = `${scorePlayer}`;
scoreComputerContainer.innerHTML = `${scoreComputer}`;

let result = document.querySelector(".result");

function buttonPressed(e) {
    playerSelection = e.target.id;

    computerSelection = Math.floor(Math.random() * options.length);
    computerSelection = options[computerSelection];

    if(playerSelection == computerSelection) {
        // TIE
        result.innerHTML = `You both chose <span>${playerSelection}</span>! It's a tie!`;
    } else if(
        (playerSelection == "rock" && computerSelection == "scissors") ||
        (playerSelection == "paper" && computerSelection == "rock") ||
        (playerSelection == "scissors" && computerSelection == "paper")
        ) {
        // WIN
        scorePlayer = scorePlayer + 1;
        result.innerHTML = `<span>${playerSelection}</span> beats <span>${computerSelection}</span>! You win!`;
    } else {
        // LOSE
        scoreComputer = scoreComputer + 1;
        result.innerHTML = `<span>${computerSelection}</span> beats <span>${playerSelection}</span>! Computer wins!`;
    }

    imgPlayer.src = `img/${playerSelection}.gif`;
    imgComputer.src = `img/${computerSelection}.gif`;
    for (const button of buttons) {
        button.classList.add("disabled");
    }

    setTimeout(function(){
        imgPlayer.src = `img/wave.gif`;
        imgComputer.src = `img/wave.gif`;
        for (const button of buttons) {
            button.classList.remove("disabled");
        }
        result.innerHTML = `Choose your weapon`;
    },2000);

    scorePlayerContainer.innerHTML = `${scorePlayer}`;
    scoreComputerContainer.innerHTML = `${scoreComputer}`;

    localStorage.setItem("scorePlayer", scorePlayer);
    localStorage.setItem("scoreComputer", scoreComputer);
}

let checkLocalStorage = localStorage.getItem("scorePlayer");
if(checkLocalStorage) {
    scorePlayer = localStorage.getItem("scorePlayer");
    scoreComputer = localStorage.getItem("scoreComputer");
    scorePlayer = parseInt(scorePlayer);
    scoreComputer = parseInt(scoreComputer);
    scorePlayerContainer.innerHTML = `${scorePlayer}`;
    scoreComputerContainer.innerHTML = `${scoreComputer}`;
}