var Ttt = (function() {
  var currSymbol = 'X',
      grid = [],
      gridWidth = 3,
      resultContainer = document.getElementById('result-container'),
      restartBtn = document.getElementById('restart-btn'),
      winnerHolder = document.getElementById('winner'),
      winDrawHolder = document.getElementById('win-draw'),
      currentX = document.getElementById('current-x'),
      currentO = document.getElementById('current-o'),
      // All possible winning moves
      winList = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];


  var play = function() {
    createGrid();
    drawGrid();
    createStrikes();
    slots = document.getElementsByClassName('slot');
    render();
    moveListener();
    restartListener();
  };

  var restart = function() {
    currSymbol = 'O';
    updateCurrSymbol();
    grid = [];
    createGrid();
    render();
    hideResult();
  }

  var restartListener = function() {
    restartBtn.addEventListener('click', restart);
  };

  // Create all possible strikes
  var createStrikes = function() {
    var strikesContainer = document.getElementById('strikes');
    for(var i = 0; i < winList.length; i++) {
      var strike = document.createElement('span');
      strike.className = 'strike';
      strike.id = 'strike' + '-' + winList[i][0] + '-' + winList[i][1] + '-' + winList[i][2];
      strikesContainer.appendChild(strike);
    }
  };

  // Put empty items into grid
  var createGrid = function() {
    for (var i = 0; i < gridWidth * gridWidth; i++) {
      grid.push('');
    }
  };

  // Show items in the grid
  var render = function() {
    for(var i = 0; i < slots.length; i++) {
      slots[i].innerHTML = grid[i];
    }

  };

  // Create HTML elements for the grid
  var drawGrid = function() {
    var currId = 0;
    var slotsContainer = document.getElementById('slots');

    var createSlot = function(className, id) {
      var slot = document.createElement('div');
      slot.className = className;
      slot.id = 'slot-' + id;
      slot.dataset.item = '';
      currId++;
      return slot;
    };

    for(var i = 0; i < gridWidth * gridWidth; i++) {
      var slot = createSlot('slot', currId);
      slotsContainer.appendChild(slot);
    }
  };

  var moveListener = function() {
    for(var i = 0; i < slots.length; i++) {
      slots[i].addEventListener('click', function() {

        // Do something if valid move
        if(addMove(this)) {
          render();

          // Check winner
          if(win()) {
            setTimeout(showWinner, 800);
            return;
          }

          // Check draw
          if(draw()) {
            showDraw();
            return;
          }

          updateCurrSymbol();
        }
      });
    }
  };

  var showWinner = function() {
    winnerHolder.innerHTML = currSymbol;
    winDrawHolder.innerHTML = 'Winner!';
    showResult();
    // Hide strike
    if(typeof strike != 'undefined') {
      strike.style.visibility = 'hidden';
      strike.style.opacity = 0;
    }
  };

  var showDraw = function() {
    winnerHolder.innerHTML = 'X O';
    winDrawHolder.innerHTML = 'Draw!';
    showResult();
  };


  var showResult = function() {
    resultContainer.style.visibility = 'visible';
    resultContainer.style.opacity = 1;

  };

  var hideResult = function() {
    resultContainer.style.visibility = 'hidden';
    resultContainer.style.opacity = 0;
  };

  var updateCurrSymbol = function() {
    if(currSymbol == 'X') {
      currSymbol = 'O';
      currentX.className = '';
      currentO.className = 'active';
    } else {
      currSymbol = 'X';
      currentO.className = '';
      currentX.className = 'active';
    }
  };

  var draw = function() {
    return (grid.indexOf('') == -1);
  };

  var win = function() {

    // Check if current player's moves match with a set in winList
    for(var i = 0; i < winList.length; i++) {
      var hasWinner = true;

      // One unmatched number then skip this set
      for(var j = 0; j < winList[i].length; j++) {
        if(grid[winList[i][j]] != currSymbol) {
          hasWinner = false;
          break;
        }
      }

      // Has a winner if find a complete match
      if(hasWinner) {
        showStrike(winList[i]);
        return true;
      }
    }

    // No match
    return false;
  };

  var showStrike = function(winSet) {
    var strikeId = 'strike' + '-' + winSet[0] + '-' + winSet[1] + '-' + winSet[2];
    strike = document.getElementById(strikeId)
    strike.style.visibility = 'visible';
    strike.style.opacity = 1;
  };


  var addMove = function(slot) {
    var slotNum = parseInt(getSlotNum(slot.id));

    // Return false when click on non-empty slot
    if(grid[slotNum]) {
      return false;
    }

    // Update grid
    grid[slotNum] = currSymbol;

    return true;
  };


  var getSlotNum = function(slotId) {
    return slotId[slotId.length - 1];
  };

  return {
    play: play,
  };
})();

Ttt.play();