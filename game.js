'use scrict'

//Dont do global variables
var bgColors = [
  '#F19C38',
  '#8AD8EA'
]

//Game has a player
function Game(parent) {
  var self = this;

  self.parentElement = parent;
  self.gameElement = null
  self.onGameOverCallback = null;
  self.isGameOver = false;
  self.beers = [];

  self.currentIdx = 0;
  self.offsetIdx = 1;
  self.bgColor = "#000000";

  self._init();
  self._startLoop();
}

Game.prototype._init = function () {
  var self = this;

  self.gameElement = buildDom(`
    <main class="game container">
    <audio src="music.mp3" loop="true" autoplay = "true"></audio>
    <div class="border-container">
      <header class="game__header text-style">
      <div class="score text-style">
        <span class="label">Score:</span>
        <span class="value"></span>
      </div>
      </header>
    </div>
      <div id="game_c" class="game__canvas">
        <canvas></canvas>
      </div>
    </main>
  `)

  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('canvas');

  self.scoreElement = document.querySelector(".score .value");

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');
}

Game.prototype._startLoop = function () {
  var self = this;
  var randomPosition = self._getRandomPositions();
  self.beers = [new Beer(self.canvasElement, randomPosition.x, randomPosition.y)]
  self.player = new Player(self.canvasElement);
  self.score = 0;

  self.handleKeyDown = function (evt) {
    if (evt.key === "ArrowDown") {
      self.player.setDirection(0, 1)
    }
    if (evt.key === "ArrowUp") {
      self.player.setDirection(0, -1)
    }
    if (evt.key === "ArrowLeft") {
      self.player.setDirection(-1, 0)
    }
    if (evt.key === "ArrowRight") {
      self.player.setDirection(1, 0)
    }
  }

  document.addEventListener('keydown', self.handleKeyDown);


  function loop() {
    self._clearAll();
    self._updateAll();
    self._renderAll();
  
    if (!self.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      self.onGameOverCallback();
    }
  }

  requestAnimationFrame(loop);
}

Game.prototype._updateAll = function () {

  var self = this;
 
  self.player.update();
  self._checkAllCollision();

  self._updateUI();
}

Game.prototype._renderAll = function () {
  var self = this;

  self._renderBackground();

  self.beers.forEach(function(item){

    item.render();
  })


  self.player.render();

}

Game.prototype._clearAll = function () {
  var self = this;

  self.ctx.clearRect(0, 0, self.width, self.height);
}

// TODO:- remove this hack
var centilla = 0;

Game.prototype._renderBackground = function () {
  var self = this;

  self.ctx.fillStyle = self.bgColor;

  self.ctx.fillRect(0,0, self.width, self.height);
  
  if (centilla > 3) {
    self.bgColor = '#000000';
    centilla = 0;
  }
  centilla++;
}

Game.prototype._checkAllCollision = function() {
  var self = this;

  self.beers.forEach(function(item){
      if(self.player.checkCollision(item)) {
        self.currentIdx += self.offsetIdx;
        if (self.currentIdx === bgColors.length - 1 || self.currentIdx === 0) {
          self.offsetIdx *= -1;
        }
        
        self.bgColor = bgColors[self.currentIdx];

        
        if(item.state === 'beer'){
          self.player.invertDirection();
          var newPosition = self._getRandomPositions();
          self.beers.push(new Beer(self.canvasElement, newPosition.x, newPosition.y));
          self.score++;
          item.state = 'wall';
        }else if(item.state === 'wall'){
          self.gameOver();
        }
      } 
  })
}

Game.prototype._getRandomPositions = function ()  {
  var self = this;
  
  var newPosition = self._getNewPositions();
  for (var i = 0; i < self.beers.length; i++) {
    var currentBeer = self.beers[i];
    if (currentBeer.x === newPosition.x && currentBeer.y === newPosition.y) {
      newPosition = self._getNewPositions();
      i = 0;
    }
  }

  return newPosition;

}

Game.prototype._getNewPositions = function () {
  var self = this;

  var wallSize = 20;
  var numberHeightAvailable = self.height / wallSize;
  var numberWidthAvailable = self.width / wallSize;

  var randomX = Math.floor(Math.random() * numberWidthAvailable) * wallSize;
  var randomY = Math.floor(Math.random() * numberHeightAvailable) * wallSize;

  return {x: randomX, y: randomY}

}

Game.prototype.gameOver = function () {
  var self = this;
  self.isGameOver = true;
}

Game.prototype.onOver = function (callback) {
  var self = this;

  self.onGameOverCallback = callback;
}

Game.prototype.destroy = function () {
  var self = this;

  self.gameElement.remove();
  self.onGameOverCallback = null;
}

Game.prototype._updateUI = function () {
  var self = this;

  self.scoreElement.innerText = self.score;
}