'use strict';

//Dont do global variables
var globalColors = [
  '#230704',
  '#771910',
  '#F33323',
  '#FF857A',
  '#FFECEA'
]

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
      <h4 class="text-style">Press Start or Space:</h4>
      <a class ="start-btn btn">Start Game</a>
      <p class = "instructions-text text-style">Move Sneaky Snake with Arrows, avoid blue squares and hit the red ones!</p>
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
        <h1 class="text-style">Game over</h1>
        <p class="text-style">Your score: <span class="score"></span></p>
        <ul class="ranking text-style">
        </ul>
        <a class="restart-btn btn">Play Again</a>
      </main>
    `);
    // ^ add the scores
    mainContainerElement.appendChild(gameoverElement);

    gameoverButton = document.querySelector('a.restart-btn');
    
    scoreElement = document.querySelector('.score');
    rankingElement = document.querySelector('.ranking');
    buildRanking(data);
    
    scoreElement.innerText = score;
    document.body.addEventListener('keyup',handleGameoverClick)
    gameoverButton.addEventListener('click', handleGameoverClick);
  }

  function destroyGameover() {
    gameoverButton.removeEventListener('click', handleGameoverClick);
    document.body.removeEventListener('keyup', handleGameoverClick);
    
    
    gameoverElement.remove();
  }




  function saveScore(score) {
    // get name with a prompt and save it in a object with the score
    var newName = prompt('Write your name here: ');

    if (!newName) {
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

      return JSON.parse(ranking).slice(0, 10);
    }
    // return the array;
    function buildRanking (sortedPlayers) {
      sortedPlayers.forEach(function (item){
        var name = item.name;
        var score = item.score;
        
        var li = document.createElement('li');
        li.innerText = name + ' ' + score;
        
        rankingElement.appendChild(li);
        
        })
  
      }

    
  buildSplash();
}

document.addEventListener('DOMContentLoaded', main);
