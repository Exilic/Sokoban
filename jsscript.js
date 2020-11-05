var secondsPlayed = 0;

function createSokobanMap(){
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 19; x++) {
            document.getElementById('gamecomponents').appendChild(document.createElement("div")).id = "y"+y+"x"+x;
            
            let id = document.getElementById('y'+y+'x'+x);
            id.classList.add(rightElement(y, x));
            if(id.classList.contains("tile-wall") || id.classList.contains("tile-goal")) {
            }else{id.classList.add("tile-space");}
        } 
    }
}

function gameTime() {
    secondsPlayed += 1;
    document.getElementById('gameTime').innerHTML = secondsPlayed;
}

function rightElement(y, x) {
    switch (tileMap01.mapGrid[y][x][0]){
        case ' ':
            return Tiles.Space;
        case 'W':
            return Tiles.Wall;
        case 'G':
            return Tiles.Goal;
        case 'P':
            return Entities.Character;
        case 'B':
            return Entities.Block;
    }
}

function attemptMove(y, x) {
    let player = document.getElementsByClassName('entity-player')[0].id;
    let withoutY = player.substring(1);
    let plainCoordinates = withoutY.split('x');
    
    let targetId = 'y'+(parseInt(plainCoordinates[0])+y)+'x'+(parseInt(plainCoordinates[1])+x);
    let target = document.getElementById(targetId);
    let beyondTargetId = 'y'+(parseInt(plainCoordinates[0])+(2*y))+'x'+(parseInt(plainCoordinates[1])+(2*x));
    let beyondTarget = document.getElementById(beyondTargetId);
    
    if(target.classList.contains("tile-wall")) {
    }else if(target.classList.contains("tile-space") || target.classList.contains("tile-goal")) {
        if(target.classList.contains("entity-block") || target.classList.contains("entity-block-goal")){
            if(beyondTarget.classList.contains("tile-space") || beyondTarget.classList.contains("tile-goal")) {
                if(beyondTarget.classList.contains("entity-block") || beyondTarget.classList.contains("entity-block-goal")) {
                }else{                    
                        moveElement(beyondTargetId, targetId, "entity-block");
                        moveElement(targetId, player, "entity-player");                     
                }        
            }
        }else{
                moveElement(targetId, player, Entities.Character);
            }
    }else if(target.classList.contains("tile-goal")) {
            moveElement(targetId, player, "entity-player");
        }   
}

function checkState(){
    if(document.getElementsByClassName("entity-block-goal").length == 6){
        console.log("You have won!");
        clearInterval(countingSeconds);
    }
}

function moveElement(newSquare, oldSquare, kind) {
    let idOld = document.getElementById(oldSquare);
    let idNew = document.getElementById(newSquare);
    if(kind == "entity-block" && idNew.classList.contains("tile-goal")){
        idNew.classList.add("entity-block-goal");
        checkState();
        if(kind == "entity-block" && idOld.classList.contains("tile-goal")){
            idOld.classList.remove("entity-block-goal");
        }else{
            idOld.classList.remove("entity-block");
        }
    }else if(kind == "entity-block" && idOld.classList.contains("tile-goal") && idNew.classList.contains("tile-space")){
        idOld.classList.remove("entity-block-goal");
        idNew.classList.add("entity-block");
    }else{
        idOld.classList.remove(kind);
        idNew.classList.add(kind);
    }
}


document.addEventListener('keydown', function(event) {
    event.preventDefault();
    switch (event.key) {
        case 'ArrowLeft':
            attemptMove(0, -1);
            break;
        case 'ArrowUp':
            attemptMove(-1, 0);
            break;
        case 'ArrowRight':
            attemptMove(0, 1);
            break;
        case 'ArrowDown':
            attemptMove(1, 0);
            break;
        default:
            break;
    }
})

createSokobanMap();

var countingSeconds = setInterval(gameTime, 1000);