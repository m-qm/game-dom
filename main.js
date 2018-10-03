'use strict';

function buildDom(html) {
  var div = document.createElement('div');
  div.innerHTML = html;
  return div.children[0];
}

function main() {

  var mainContainerElement = document.querySelector('#main-container');
  
  // -- Splash

  var splashElement = null;
  var splashButton = null;


  var handleSplashClick = function () {
    destroySplash();
    buildGame();
  }
  var handleSplashSpace = function (e) {
    e.preventDefault()
    if(e.keyCode == 32){
      destroySplash();
      buildGame();
    }
  }

  
  function buildSplash() {
    splashElement = buildDom(`
    <main class="splash container">

      <img class="logo" src="img/title.png" alt="logo">
      <h4>Press Start or Space:</h4>
      <a class ="start-btn btn">Start Game</a>
      <p class = "instructions-text"> </p>
    </main>
    `)

    
    mainContainerElement.appendChild(splashElement);
    document.body.addEventListener('keyup',handleSplashSpace)

    splashButton = document.querySelector('a.start-btn');
    splashButton.addEventListener('click', handleSplashClick);
  }

  function destroySplash() {
    splashButton.removeEventListener('click', handleSplashClick);
    document.body.removeEventListener('keyup', handleSplashSpace);
    splashElement.remove();
  }

  // -- Game
  var game = null;
  var handleGameOver = function () {
    destroyGame();
    buildGameover(game.score);
  };

  function buildGame() {
    game = new Game(mainContainerElement);
    game.onOver(handleGameOver);
  }

  function destroyGame() {
    game.destroy();
  }

  // -- Gameover
  var gameoverElement = null;
  var gameoverButton = null;
  var scoreElement = null;
  var rankingElement = null;
  
  var handleGameoverClick = function () {
    destroyGameover();
    buildSplash();
  }

  function buildGameover(score) {

    // call saveScore(score) and save the result 
    var data = saveScore(score);

    gameoverElement = buildDom(`
      <main class="gameover container">
        <h1>Game over</h1>
        <p>Your score: <span class="score"></span></p>
        <ul class="ranking">

        <a class="restart-btn btn">Play Again</a>
        </ul>
      </main>
    `);
    // ^ add the scores
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('a.restart-btn');
    document.body.addEventListener('keyup',handleSplashSpace)

    scoreElement = document.querySelector('.score');
    rankingElement = document.querySelector('.ranking');
    buildRanking(data);

    scoreElement.innerText = score;
    gameoverButton.addEventListener('click', handleGameoverClick);
  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    document.body.removeEventListener('keyup', handleSplashSpace);
    scoreElement.remove();
  }




  function saveScore(score) {
    // get name with a prompt and save it in a object with the score
    var newName = prompt('Write your name here: ');

    if (newName.length === 0) {
      newName = "Player";
    }
    var userRanking = {name: newName, score: score};

    // getItem("ranking") array from localStorage and parse the result with JSON.parse
    var ranking = localStorage.getItem("ranking");

    if (ranking === null) {
      ranking = [];
    } else {
      ranking = JSON.parse(ranking);
    }

    // push the object into the result array 
    ranking.push(userRanking);
    
    // sort the ranking

    var sortedPlayers = ranking.sort(function(a,b){
      return b.score - a.score
    });
    // stringify the array
    ranking = JSON.stringify(sortedPlayers);

    // setItem("ranking") to localStorage with the array
    localStorage.setItem("ranking", ranking);

      return JSON.parse(ranking);
    }
    // return the array;
    function buildRanking (sortedPlayers) {
      sortedPlayers.forEach(function (item){
        var name = item.name;
        var score = item.score;
        
        var div = document.createElement('div');
        div.innerText = name + ' ' + score;
        
        rankingElement.appendChild(div);
        
        })
  
      }

    
  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);
