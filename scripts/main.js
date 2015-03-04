var gameState = 0;
var createTable = function(){
var table = document.createElement("table"); 			//creating table
game.appendChild(table);								//add table as a child of game
	for (var w=1; w <= Config.cellsY; w++) {    		//creating rows "w" amount=  cellsY=20
		var tr = document.createElement("tr");    		//creating row
		table.appendChild(tr);							//add tr as a child of table
		for (var k=1; k <= Config.cellsX; k++) {		//create columns in every row, amount =  cellsY = 30
			var td = document.createElement("td");		//creating column td
			td.id = (w + "-" + k);						//giving ID as a number of row and column
			td.style.width = Config.cellSize;
			td.style.height = Config.cellSize;
			tr.appendChild(td);								//add td as a child of tr
			// if (Math.floor(Math.random()*40 )=== 0) {	//giving random td's class 'bomb'
			// 	td.classList.add('bomb');
			//}
			td.onclick = function(event){
				if (gameState === 1 && !event.target.classList.contains('detected') ) {
					saper.check(event);		// when clicked start function saper.chceck checking if it's a bomb
				}
			}
			//td.onclick = saper.count;
			td.oncontextmenu = function(event){ 
				event.preventDefault();
				if (event.which === 3 && gameState === 1){
					if (event.target.classList.contains('detected')){
						saper.unflag(event.target);
					}
					else {
					saper.flag(event.target);
					}
				}
			}
		}
	}
}
createTable();	
var time ='00:00';	
var clock = document.createElement('div');	
clock.classList.add('clock');
control.appendChild(clock);
clock.innerHTML = time;	

var bombInput = document.createElement('input');
bombInput.type = 'textbox';
bombInput.classList.add('input');
control.appendChild(bombInput);	
bombInput.placeholder = 'ile bomb';

var button = document.createElement('div');
control.appendChild(button);
button.classList.add('button');
button.innerHTML = 'START';

var bombCount =100;
var setAmountOfBombs = function(){ 
	if(bombInput.value){
		bombCount = bombInput.value;

	}
}
document.onkeydown = function(e) {
	if (e.keyCode === 13){
		setAmountOfBombs();
		console.log('ustawiono ilosc bomb na : ' + bombCount );
	}
}

var clearBombs = function(){
	var bombs = document.getElementsByClassName('bomb');
	for (i = 0; i  < bombs.length; i++){
	 bombs[i].classList.remove('bomb');
	}
}
var mainLoop;					//create var 'mainLoop' without  any value
var startGame = function(){ 												//POCXZATEK FUNKCJI STARTGAME
	if (gameState === 0) {
	game.innerHTML = '';
	document.body.classList.remove('loser');
	saper.elementsChecked = [];
	createTable();
	setAmountOfBombs();	
	gameState = 1;
	var all = document.getElementsByTagName('td');


	var distributeBombs = function(noClear) {
		if ( !clearBombs){
		clearBombs();
	}
		var nextBomb = all[Math.floor(Math.random()*all.length)];
		if (!nextBomb.classList.contains('bomb')) {
			nextBomb.classList.add('bomb');
		} else {
			distributeBombs(true);
		}
	}
	for (var i=0; i<bombCount; i++) {
		distributeBombs();
	}
	saper.init();
	var sec = 0;

	var timer = function(){
		var min;
		var second;
		if (Math.floor(sec /60) < 10 ){
			min = '0' +(Math.floor(sec / 60))
			}
			else {
			min =	(Math.floor(sec /60));
			}
			  if (sec % 60 <10){
			 	second = '0' +(sec % 60)
			 }
			 	else {
			 	second =	(sec % 60);
			 	};
		time = min + ':' + second;
		clock.innerHTML = time;
		sec++;
	}
	mainLoop = setInterval(timer, 1000);		//give 'mainLoop' value === setInterval...
}
}
button.onclick = startGame;

var stopTime = function(){
	clearInterval(mainLoop);		//stop 'mainLoop' with value === ^^ setintereval...
	gameState = 0;
}