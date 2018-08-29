const map = [
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓",
    "▓░░░▓░░░░░▓░░░░░▓░▓░▓",
    "▓░▓░▓░▓▓▓░▓▓▓▓▓░▓░▓░▓",
    "▓░▓░▓░░░▓░░░░░▓░▓░░░▓",
    "▓░▓▓▓▓▓▓▓░▓░▓▓▓░▓░▓░▓",
    "▓░░░░░░░░░▓░░░░░▓░▓░▓",
    "▓░▓▓▓░▓▓▓▓▓░▓▓▓▓▓░▓░▓",
    "▓░▓░░░▓░░░▓░▓░░░░░▓░▓",
    "▓░▓▓▓▓▓░▓░▓░▓░▓▓▓░▓░F",
    "S░░░░░▓░▓░▓░▓░▓░▓░▓▓▓",
    "▓▓▓▓▓░▓░▓░▓░▓░▓░▓░▓░▓",
    "▓░░░░░▓░▓░▓░░░▓░▓░▓░▓",
    "▓░▓▓▓▓▓▓▓░▓▓▓▓▓░▓░▓░▓",
    "▓░░░░░░░▓░░░░░░░▓░░░▓",
    "▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓"
];

const spaceBlock = "░";
const wallBlock = "▓";
const cellSize = 26;
const endRow = 281;
const endCol = 550;
let playerRow = 0;
let playerCell = 0;

let player = document.getElementById("player");


for (row = 0; row < map.length; row++) {
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    rowDiv.id = "row-" + row;
    document.getElementById("maze").appendChild(rowDiv);

    let gameMap = map[row];

    for (cell = 0; cell < gameMap.length; cell++) {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.id = "cell-" + cell;
        rowDiv.appendChild(cellDiv);

        let character = gameMap[cell];

        // starting position
        if (character == "S") {
            player.style.left = (cellSize * cell) + "px";
            player.style.top = (cellSize * row) + "px";
            playerRow = row;
            playerCell = cell; 
        }
        // wall color
        else if (character == wallBlock) {
            cellDiv.classList.add("wall");
        }
    }
}

// move through the maze
document.addEventListener("keydown", function (event) {
    let fromTop = Number(player.style.top.split("px")[0]);
    let fromLeft = Number(player.style.left.split("px")[0]);

    if (event.key == "ArrowUp") {     
        playerRow--;
        if (map[playerRow][playerCell] == wallBlock) {
            playerRow++;
        } else {
            player.style.top = (fromTop - cellSize) + "px";
        }     
    }

    if (event.key == "ArrowDown") {
        playerRow++;
        if (map[playerRow][playerCell] == wallBlock) {
            playerRow--;
        } else {
        player.style.top = (fromTop + cellSize) + "px";
        }     
    }

    if (event.key == "ArrowLeft") {
        playerCell--;
        if (map[playerRow][playerCell] == wallBlock) {
            playerCell++;  
        } else {
        player.style.left = (fromLeft - cellSize) + "px";  
        }
    } 

    if (event.key == "ArrowRight") {
        playerCell++;
        if (map[playerRow][playerCell] == wallBlock) {
            playerCell--;
        } else {
            player.style.left = (fromLeft + cellSize) + "px";
        }
    }

    function winner() {
        if (player.offsetTop == endRow && player.offsetLeft == endCol) {
            let winMessage = document.createElement("h2");
            winMessage.textContent = "You Win";
            document.body.appendChild(winMessage).style.color = "rgb(79, 153, 118)";
        } 
    }
        
    winner();
});