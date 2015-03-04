var saper = {
	// dodana funckja init ktora inicjalizuje kazdy nie-bomboty (:not(.bomb)) element tablicy
	init: function(){
		var allClearElements = document.querySelectorAll('td:not(.bomb)');

		for (var i = 0; i < allClearElements.length; i++) {
			this.count(allClearElements[i].id);
		}
		console.log('ilosc bomb = ' + document.getElementsByClassName('bomb').length);
	},
	//clicked: '',
	//toSplit: '',
	count: function(elementsId){
		var positon = elementsId.split('-');
		var row = parseInt(positon[0], 10);
		var col = parseInt(positon[1], 10);

		var bombAround = 0;
		var upLeft = document.getElementById((row-1) + '-' + (col-1));
		if (upLeft && upLeft.classList.contains('bomb')){
			bombAround++;
		}
		var up = document.getElementById((row-1) +'-' + col);
		if (up && up.classList.contains('bomb')){
			bombAround++;
		}
		var upRight = document.getElementById((row-1) +'-' + (col +1));
		if (upRight && upRight.classList.contains('bomb')){
			bombAround++;
		}
		var left = document.getElementById(row + '-' + (col -1));
		if (left && left.classList.contains('bomb')){
			bombAround++;
		}
		var right = document.getElementById(row + '-' + (col +1));
		if (right && right.classList.contains('bomb')){
			bombAround++;
		}
		var downLeft = document.getElementById((row+1) +'-' + (col -1));
		if (downLeft && downLeft.classList.contains('bomb')){
			bombAround++;
		}
		var down = document.getElementById((row+1) + '-' + col);
		if (down && down.classList.contains('bomb')){
			bombAround++;
		}
		var downRight = document.getElementById((row+1) + '-' + (col +1));
		if (downRight && downRight.classList.contains('bomb')){
			bombAround++;
		}

		// this.clicked.innerHTML = bombAround;
		// console.log(bombAround);
		document.getElementById(elementsId).dataset.bomb = bombAround;
	},

	//elementsToCheck: [],
	elementsChecked: [],

	setElementsAsZero: function(element){
		// wypisz 0 w kratce
		element.innerHTML = element.dataset.bomb;
		element.classList.add('checked');	
		// jesli funckja 'checkElement' nie sprawdzila jeszcze elementu
		// (czyli nie ma go w tablicy elementsChecked)
		if (this.elementsChecked.indexOf(element.id) === -1 && parseInt(element.dataset.bomb,  10) === 0) {
			// to wykonaj jeszcze raz funkcje 'checkElement'
			this.checkElement(element.id);
		}
	},
	// funkcja sprawdza czy do okola elementu o danym ID są jakies pola z
	// wartoscia 0 (bo wartosci sa obliczane na starcie), jesli tak to dane pole
	// (czyli takie ktore ma wartosc 0) jest sprawdzane dalej przez ta sama
	// funkcje chyba ze zostalo juz sprawdzone i dodane do tablicy
	// 'elementsChecked'
	checkElement: function(elementsId) {
		//console.log('sprawdzam dla', elementsId);
		var element = document.getElementById(elementsId);
		element.classList.remove('detected');
		element.innerHTML = element.dataset.bomb;
		element.classList.add('checked');	
		var split = elementsId.split('-');
		var row = split[0];
		var col = split[1];

		if (parseInt(element.dataset.bomb, 10) !== 0) {
			return;
		}
		//element.style.backgroundColor = "#F0F";

		// dodaj wlasnie sprawdznay element do tablicy elementsChecked
		this.elementsChecked.push(elementsId);

		var nextEl = document.getElementById((row-1) + '-' + (col-1));
		// jesli pole ma wartosc 0 to odpal 'setElementAsZero' (LOC 59)
		if (nextEl && !nextEl.classList.contains('bomb')) {
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById((row-1) +'-' + col);
		//if (nextEl && parseInt(nextEl.dataset.bomb, 10) === 0) {
		if (nextEl && !nextEl.classList.contains('bomb')){	
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById((row-1) +'-' + (parseInt(col, 10) +1));
		if (nextEl && !nextEl.classList.contains('bomb')) {
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById(row + '-' + (col -1));
		//if (nextEl && parseInt(nextEl.dataset.bomb, 10) === 0) {
					if (nextEl && !nextEl.classList.contains('bomb')){
			this.setElementsAsZero(nextEl);
		}
		nextEl = document.getElementById(row + '-' + (parseInt(col, 10)+1));

		//if (nextEl && parseInt(nextEl.dataset.bomb, 10) === 0) {
					if (nextEl && !nextEl.classList.contains('bomb')){
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById((parseInt(row, 10)+1) +'-' + (col -1));
		if (nextEl && !nextEl.classList.contains('bomb')) {
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById((parseInt(row, 10)+1) + '-' + col);
		//if (nextEl && parseInt(nextEl.dataset.bomb, 10) === 0) {
					if (nextEl && !nextEl.classList.contains('bomb')){
			this.setElementsAsZero(nextEl);
		}

		nextEl = document.getElementById((parseInt(row, 10)+1) + '-' + (parseInt(col, 10) +1));
		if (nextEl && !nextEl.classList.contains('bomb')) {
			this.setElementsAsZero(nextEl);
		}
	},

	check: function(event) {
		var clicked = event.target;
		var toSplit = clicked.id;
		console.log('odpalam check');
		console.log(toSplit);
		if (clicked.classList.contains('bomb')){
			
			document.body.classList.add('loser');   // dodaj do calego body klase loser bo chuj , juz wszystko przegrane sprawdzic CSS !!
			alert('BOOM przgrałeś');
			stopTime();
		} else {
			//return toSplit
			saper.checkElement(toSplit);
			saper.checkWin();
		}
	},
	detectedBomb : 0,
	wrongFlag : 0,
	flag: function(element) {
		//var e = window.event;
		element.classList.add('detected');
		//element.innerHTML = '!!';
		if (element.classList.contains('bomb')){
			this.detectedBomb++;
			console.log(this.detectedBomb);
		}
		else {
			this.wrongFlag++;
		}
		this.checkWin();
	},
	unflag: function(element) {
		element.classList.remove('detected');
		if (element.classList.contains('bomb')){
			this.detectedBomb--;
		}
		else {
			this.wrongFlag--;
		}
		this.checkWin();
	},
	checkWin: function() {
		console.log('SPRAWDZAM CZY WYGRALEM');
		if (this.detectedBomb === document.getElementsByClassName('bomb').length && this.wrongFlag === 0){
				alert('WIN');
				stopTime();
			}
		if (this.wrongFlag === 0 && document.getElementsByClassName('checked').length === document.getElementsByTagName('td').length - document.getElementsByClassName('bomb').length){
			alert('WIN');
			stopTime();
		}
			if (this.wrongFlag === 0 && this.checkBombs()) {
				alert('Kozacko wygrałeś');
				stopTime();
			}
	},

	checkBombs: function(){
		var bombs = document.getElementsByClassName('bomb');
		var detected = 0;
		for (var i=0, l=bombs.length; i<l; i++) {
			if ((bombs[i].classList.contains('detected') && bombs[i].classList.contains('bomb')) || this.checkNeighbours(bombs[i])) {
				//console.log('jest bomba', bombs[i]);
				detected++;
			} else {
				console.log('ni ma w ', bombs[i]);
			}
		}

		return detected === bombs.length;
	},

	checkNeighbours: function(element) {
		var neighbours = 0;
		var maxNeig = 8;
		var split = element.id.split('-');
		var row = split[0];
		var col = split[1];
		var el = document.getElementById((row-1) + '-' + (col-1));
		// jesli pole ma wartosc 0 to odpal 'setElementAsZero' (LOC 59)

		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))) {
			neighbours++;
		}

		el = document.getElementById((row-1) +'-' + col);
		if (!el) { maxNeig--; }
		//if (el && parseInt(el.dataset.bomb, 10) === 0) {
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))){	
			neighbours++;
		}

		el = document.getElementById((row-1) +'-' + (parseInt(col, 10) +1));
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))) {
			neighbours++;
		}

		el = document.getElementById(row + '-' + (col -1));
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))){
			neighbours++;
		}

		el = document.getElementById(row + '-' + (parseInt(col, 10)+1));
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))){
			neighbours++;
		}

		el = document.getElementById((parseInt(row, 10)+1) +'-' + (col -1));
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))) {
			neighbours++;
		}

		el = document.getElementById((parseInt(row, 10)+1) + '-' + col);
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))){
			neighbours++;
		}

		el = document.getElementById((parseInt(row, 10)+1) + '-' + (parseInt(col, 10) +1));
		if (!el) { maxNeig--; }
		if (el && (el.classList.contains('bomb') || el.classList.contains('checked'))) {
			neighbours++;
		}

		element.dataset.maxN = 'm: ' + maxNeig + ', n: ' + neighbours;
		//console.log('sonsiedzi', neighbours);
		return neighbours === maxNeig;
	}
};
