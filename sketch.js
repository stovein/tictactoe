let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

let players = ["X", "O"];

let available = [];

let currentPlayer = 0;

function setup() {
    createCanvas(400, 400);
    frameRate(1);
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            available.push([i, j]);
        }
    }
}

function nextTurn() {
    let player = players[currentPlayer];
    let place = available.splice(floor(random(available.length)), 1)[0];

    board[place[0]][place[1]] = player;

    currentPlayer = ++currentPlayer % 2;
}

function equality(a, b, c) {
    return a == b && b == c && a != "";
}

function checkWinner() {
    let winner = null;

    for (let i = 0; i < 3; i++) {
        if (equality(board[i][0], board[i][1], board[i][2])) {
            winner = board[i][0];
        } else if (equality(board[0][i], board[1][i], board[2][i])) {
            winner = board[0][i];
        }
    }
    if (winner === null) {
        if (equality(board[0][0], board[1][1], board[2][2])) {
            winner = board[0][0];
        } else if (equality(board[0][2], board[1][1], board[2][0])) {
            winner = board[1][1];
        }
    }
    if (winner === null && available.length === 0) {
        return "tie";
    } else {
        return winner;
    }
}

function draw() {
    background(200);
    let p = createP("");
    let w = width / 3;
    let h = height / 3;

    // vertical lines
    strokeWeight(3);
    line(w, 0, w, height);
    line(w * 2, 0, w * 2, height);

    // horizontal lines
    line(0, h, width, h);
    line(0, h * 2, width, h * 2);

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = w * (j + 0.38);
            let y = h * (i + 0.65);
            let spot = board[i][j];
            textSize(52);
            text(spot, x, y);
        }
    }

    let result = checkWinner();
    if (result != null) {
        noLoop();
        if (result === "tie") {
            p.html("The match ends as a tie!");
        } else {
            p.html(`${result} is the winner!`);
        }
    } else {
        nextTurn();
    }
}
