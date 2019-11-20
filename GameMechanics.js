var totalCols = 20;
var totalRows = 20;
var posXBlu = 1
var posYBlu = 1
var prevPosXBlu = 1;
var prevPosYBlu = 1;
var posXRed = totalCols;
var posYRed = totalRows;
var prevPosXRed = 1;
var prevPosYRed = 1;
var posXPoint;
var posYPoint;
var scoreBlu = 0;
var scoreRed = 0;
var winScore = 10;
var winnerBlock = 0;
var posArray = [];
var wallArray = [];
var wallRef = document.getElementsByClassName("wall");
window.addEventListener("load", onLoad)
function choosePoint() {
    for (i = 0; i <= wallRef.length; i++) {
        posXPoint = Math.ceil(Math.random() * totalCols);
        posYPoint = Math.ceil(Math.random() * totalRows);
        if (wallArray.includes(`${posYPoint}.${posXPoint}`) === false && posArray.includes(`${posYPoint}.${posXPoint}`) === false) {
        document.getElementById(`${posYPoint}.${posXPoint}`).style.background = "#ffff00"
        break;
        }
    }
}
function updatePosition() {
    document.getElementById(`${prevPosYBlu}.${prevPosXBlu}`).style.background = "#ffffff";
    document.getElementById(`${prevPosYRed}.${prevPosXRed}`).style.background = "#ffffff";
    document.getElementById(`${posYBlu}.${posXBlu}`).style.background = "#0000ff";
    document.getElementById(`${posYRed}.${posXRed}`).style.background = "#ff0000";
    prevPosXBlu = posXBlu;
    prevPosYBlu = posYBlu;
    prevPosXRed = posXRed;
    prevPosYRed = posYRed;
    if (posXBlu === posXRed && posYBlu === posYRed) {
        document.getElementById(`${posYBlu}.${posXBlu}`).style.background = "#ff00ff";
    }
    updatePosArray();
    checkPoint();
    if (scoreBlu === winScore && winnerBlock === 0) {
        document.getElementById("winner").innerHTML = "Blu Wins";
        document.getElementById("winner").style.color = "#0000ff";
        winnerBlock = 1;
    }
    if (scoreRed === winScore && winnerBlock === 0) {
        document.getElementById("winner").innerHTML = "Red Wins";
        document.getElementById("winner").style.color = "#ff0000";
        winnerBlock = 1;
    }
    setWalls();
}
function updatePosArray() {
    posArray.splice(0,1,`${posYBlu}.${posXBlu}`);
    posArray.splice(1,1,`${posYRed}.${posXRed}`);
}
function checkPoint() {
    if (posXBlu === posXPoint && posYBlu === posYPoint) {
        scoreBlu += 1;
        document.getElementById("bluScore").innerHTML = scoreBlu;
        choosePoint();
    }
    if (posXRed === posXPoint && posYRed === posYPoint) {
        scoreRed += 1;
        document.getElementById("redScore").innerHTML = scoreRed;
        choosePoint();
    }
}
function checkKey(e) {
    switch (e.which) {
        case 37: //left
            if (posXRed !== 1) {
                posXRed -= 1;
                if (wallArray.includes(posYRed + "." + posXRed) === true || posArray.includes(posYRed + "." + posXRed) === true) {
                    posXRed += 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 65:
            if (posXBlu !== 1) {
                posXBlu -= 1;
                if (wallArray.includes(posYBlu + "." + posXBlu) === true || posArray.includes(posYBlu + "." + posXBlu) === true) {
                    posXBlu += 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 38: //up
            if (posYRed !== 1) {
                posYRed -= 1;
                if (wallArray.includes(posYRed + "." + posXRed) === true || posArray.includes(posYRed + "." + posXRed) === true) {
                    posYRed += 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 87:
            if (posYBlu !== 1) {
                posYBlu -= 1;
                if (wallArray.includes(posYBlu + "." + posXBlu) === true || posArray.includes(posYBlu + "." + posXBlu) === true) {
                    posYBlu += 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 39: //right
            if (posXRed !== totalCols) {
                posXRed += 1;
                if (wallArray.includes(posYRed + "." + posXRed) === true || posArray.includes(posYRed + "." + posXRed) === true) {
                    posXRed -= 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 68:
            if (posXBlu !== totalCols) {
                posXBlu += 1;
                if (wallArray.includes(posYBlu + "." + posXBlu) === true || posArray.includes(posYBlu + "." + posXBlu) === true) {
                    posXBlu -= 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 40: //down
            if (posYRed !== totalRows) {
                posYRed += 1;
                if (wallArray.includes(posYRed + "." + posXRed) === true || posArray.includes(posYRed + "." + posXRed) === true) {
                    posYRed -= 1;
                } else {
                    updatePosition();
                }
            }
            break;
        case 83:
            if (posYBlu !== totalRows) {
                posYBlu += 1;
                if (wallArray.includes(posYBlu + "." + posXBlu) === true || posArray.includes(posYBlu + "." + posXBlu) === true) {
                    posYBlu -= 1;
                } else {
                    updatePosition();
                }
            }
            break;
    }
}
var tempCellWall;
function setWalls() {
    for (i = 0; i < wallRef.length; i++) {
        wallRef[i].style.backgroundColor = "#000000";
    }
}
function onLoad() {
    document.getElementById("winScore").innerHTML = "Playing to: " + winScore;
    for (i = 0; i < wallRef.length; i++) {
        tempCellWall = document.getElementsByClassName("wall")[i].id;
        wallArray.splice(0,0, tempCellWall);
    }
    posArray.splice(0,0,`${posYBlu}.${posXBlu}`);
    posArray.splice(0,0,`${posYRed}.${posXRed}`);
    document.getElementById("bluScore").innerHTML = scoreBlu;
    document.getElementById("redScore").innerHTML = scoreRed;
    choosePoint();
    updatePosition();
}
window.addEventListener("keydown", checkKey)