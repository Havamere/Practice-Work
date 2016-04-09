// Creates the desidered game board
var gameBoard = [];
function createGameBoard(numberOfRows,numberOfColumns) {
    gameBoard = new Array(numberOfRows);
    for (x=0; x<numberOfRows; x++){
        gameBoard[x] = new Array(numberOfColumns);
    }
    for (i=0; i<numberOfRows; i++){
        for (j=0; j<numberOfColumns; j++){
            gameBoard[i][j] = "-";
        }
    } 
}
createGameBoard(6,6);

//Helper function to make needed copies of game boards
function cloneBoard(gameBoardRow){
    return gameBoardRow.slice().map(function (gameBoardColumn){ 
        return gameBoardColumn.slice();
    });
}

//Helper function for making computer choices
function computerChoice() {
    return Math.floor(Math.random()*6);
}
//Checks if entered number is a proper number
function isThisRowNumberCorrect(number1){
    if (number1 < 0 || number1 > 5 || isNaN(number1)){
        alert("Please choose a row number between 0 and 5!");
        number1 = prompt("Please choose a row number between 0 and 5.")-'';
    }
    return number1;
}

function isThisColumnNumberCorrect(number2){
    if (number2 < 0|| number2 > 5 || isNaN(number2)){
        alert("Please choose a column number between 0 and 5!");
        number2 = prompt("Please choose a column number between 0 and 5.")-'';
    }
    return number2;
}

//Sets up player's personal board for player reference
var playerBoard = cloneBoard(gameBoard);
function setPlayerBoard() {
    alert("Please place your 2 piece boat.");
    playerChoiceRow = prompt("Please select the row. (0 though 5)")-'';
    playerChoiceColumn = prompt("Please select the column. (1 through 5)")-'';
    playerboat1 = function(playerChoiceRow,playerChoiceColumn){
        playerChoiceRow = isThisRowNumberCorrect(playerChoiceRow);
        playerChoiceColumn = isThisColumnNumberCorrect(playerChoiceColumn);
        playerBoard[playerChoiceRow][playerChoiceColumn] = "0";
        playerBoard[playerChoiceRow][(playerChoiceColumn-1)] = "0";
	};
    playerboat1(playerChoiceRow,playerChoiceColumn);
    
    alert("Please place your 3 piece boat.");
    playerChoiceRow2 = prompt("Please select the row. (0 though 5)")-'';
    playerChoiceColumn2 = prompt("Please select the column. (2 through 5)")-'';
    if (playerChoiceRow2 === playerChoiceRow){
		alert("Please place your boats on separate rows");
		playerChoiceRow2 = prompt("Please select the row. (0 though 5)")-'';
    }
	playerboat2 = function(playerChoiceRow2,playerChoiceColumn2){
        playerChoiceRow2 = isThisRowNumberCorrect(playerChoiceRow2);
        playerChoiceColumn2 = isThisColumnNumberCorrect(playerChoiceColumn2);
	    playerBoard[playerChoiceRow2][playerChoiceColumn2] = "0";
	    playerBoard[playerChoiceRow2][(playerChoiceColumn2)-1] = "0";
	    playerBoard[playerChoiceRow2][(playerChoiceColumn2)-2] = "0";
	};
    playerboat2(playerChoiceRow2,playerChoiceColumn2);
    console.log(playerBoard);
}
setPlayerBoard();

//Sets up computer's game board for game's reference
var computerBoard = cloneBoard(gameBoard);
function setComputerBoard() {
    alert("Computer is placing it's boats.");
    computerChoiceRow = computerChoice();
	computerChoiceColumn = Math.floor((Math.random()*5)+1);
	computerBoat1 = function(computerChoiceRow, computerChoiceColumn){
		computerBoard[computerChoiceRow][computerChoiceColumn] = "0";
		computerBoard[computerChoiceRow][(computerChoiceColumn)-1] = "0";
	};
    computerBoat1(computerChoiceRow,computerChoiceColumn);
    computerChoiceRow2 = computerChoice();
    if (computerChoiceRow2 === computerChoiceRow){
        computerChoiceRow2++;
    }
    computerChoiceColumn2 = Math.floor((Math.random()*4)+2);
	computerBoat2 = function(computerChoiceRow2,computerChoiceColumn2){
	    computerBoard[computerChoiceRow2][computerChoiceColumn2] = "0";
	    computerBoard[computerChoiceRow2][(computerChoiceColumn2)-1] = "0";
	    computerBoard[computerChoiceRow2][(computerChoiceColumn2)-2] = "0";
	};
    computerBoat2(computerChoiceRow2,computerChoiceColumn2);
}
setComputerBoard();

//Varibles in use for next functions
var playerChoiceRow = 0;
var playerChoiceColumn = 0;
var playerAttackArray = [];
var playerAttackBoard = cloneBoard(gameBoard);
var playerAttackScreen = cloneBoard(playerAttackBoard);
var playerCounter = 0;
var playerDamage = false;

var computerChoiceRow = computerChoice();
var computerChoiceColumn = computerChoice();
var computerAttackArray = [];
var computerAttackBoard = cloneBoard(playerBoard);
var computerAttackScreen = cloneBoard(computerAttackBoard);
var computerCounter = 0;

//Player actions and checks
function playerAttack(playerChoiceRow,playerChoiceColumn) {
    playerChoiceRow = isThisRowNumberCorrect(playerChoiceRow);
    playerChoiceColumn = isThisColumnNumberCorrect(playerChoiceColumn);
    if (playerAttackArray.length > 1){
        playerAttackArray.forEach(function compare(attackEntry){
        if (""+[playerChoiceRow,playerChoiceColumn] === ""+attackEntry){
            alert("You have already attacked this coordinate, please choose again.");
            playerAttackArray.pop();
            playerChoiceRow = prompt("Please choose a row number between 0 and 5.")-'';
            playerChoiceColumn = prompt("Please choose a column number between 0 and 5.")-'';
            playerChoiceRow = isThisRowNumberCorrect(playerChoiceRow);
            playerChoiceColumn = isThisColumnNumberCorrect(playerChoiceColumn);
            playerAttackArray.push([playerChoiceRow,playerChoiceColumn]);
        }
    });
    }
    playerAttackArray.push([playerChoiceRow,playerChoiceColumn]);
    playerAttackBoard[playerChoiceRow][playerChoiceColumn] = "0";
	if (playerAttackBoard[playerChoiceRow][playerChoiceColumn] === 
		computerBoard[playerChoiceRow][playerChoiceColumn]) {
			alert("You have scored a hit!");
			playerAttackScreen[playerChoiceRow][playerChoiceColumn] = "!";
			playerCounter++;
		} else {
			alert("You have missed your target.");
			playerAttackScreen[playerChoiceRow][playerChoiceColumn] = "X";
		}
	console.log(playerAttackScreen);
}

//Computer actions and checks
function computerAttack(computerChoiceRow,computerChoiceColumn) {
    for (var i=0; i<computerAttackArray.length; i++){
        if (""+[computerChoiceRow,computerChoiceColumn] == ""+computerAttackArray[i]){
            computerChoiceRow = computerChoice();
            computerChoiceColumn = computerChoice();
        }
    }
	computerAttackBoard[computerChoiceRow][computerChoiceColumn] = "0";
    computerAttackArray.push([computerChoiceRow,computerChoiceColumn]);
	if (computerAttackBoard[computerChoiceRow][computerChoiceColumn] ===
		playerBoard[computerChoiceRow][computerChoiceColumn]) {
			alert("Your enemy has hit your one of your ships!");
			computerAttackScreen[computerChoiceRow][computerChoiceColumn] = "!";
			computerAttackBoard[computerChoiceRow][computerChoiceColumn] = "!";
			computerCounter++;
			playerDamage = true;
		} else {
			alert("Your enemy has fired and missed.");
			computerAttackScreen[computerChoiceRow][computerChoiceColumn] = "X";
			computerAttackBoard[computerChoiceRow][computerChoiceColumn] = "X";
			playerDamage = false;
		}
	console.log(computerAttackScreen);
}
//Computer attempt to follow game logic and win faster
function computerHit(){
    var x = computerAttackArray[computerAttackArray.length - 1][0];
    var y = computerAttackArray[computerAttackArray.length - 1][1] -1;
    if(y < 0){
        computerAttack(computerChoiceRow,computerChoiceColumn);
    }
	computerAttack(x,y);
}

// The game
while (playerCounter <= 4 || computerCounter <=4){
	var playerChoiceRow = prompt("Please select row of attack. (0 though 5)")-'';
	var playerChoiceColumn = prompt("Please select column of attack. (0 though 5)")-'';
	playerAttack(playerChoiceRow,playerChoiceColumn);
    if (playerCounter == 5){
        alert("You have sunk all enemy boats!");
        break;
	}
	var computerChoiceRow = computerChoice();
	var computerChoiceColumn = computerChoice();
    if (playerDamage === true){
        computerHit();
        } else {
           computerAttack(computerChoiceRow,computerChoiceColumn); 
        }
	if (computerCounter == 5){
	    alert("The computer has destroyed all of your boats!");
        break;
	}   
}