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

for (i = 0; i < map.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    row.id = "row-" + i;
    document.getElementById("maze").appendChild(row);

    let gameMap = map[i];

    for (j = 0; j < gameMap.length; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = "cell-" + j;
        row.appendChild(cell);

        let character = gameMap[j];

        // starting position
        if (character == "S") {
            player.style.left = (cellSize * j) + "px";
            player.style.top = (cellSize * i) + "px";
            playerRow = i;
            playerCell = j; 
        }
        // wall color
        else if (character == wallBlock) {
            cell.classList.add("wall");
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