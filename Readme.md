
# SneakySnake Game

### Description
Snake game is a very simple game build in HTML5 and JS in which
the player has to control a snake and eat as much food as possible.
It is a one life game, and the losing condition is when the snake hits the walls of the game.

MVP (CANVAS)

CANVAS The MVP version will be the first level of the game:
a snake and one piece of food. 
- Canvas
- Create Snake
- Move Snake
- Create Food
- Food Collision
- IsDead? (Collision with itself or walls)
- When Snake eats food generate next piece

Backlog

- Add points + score
- Increase the snake by number of pieces of food eaten
- Add pause
- History of scores by player
- Design
- Images
- 
- Mobile version

Data structure

Game.js

```

    Game() {
        self.gameIsOver;
        self.score;
    }

    Game.prototype.start(
        buildDom();
        self.score;
        self.input;
        self.canvas;
        self.width;
        self.height;
        snake = new Snake();
        food = new Food();
        addEventListener;
        self.startLoop();
    )

    Game.prototype.startLoop(
      ctx
      loop() {
        //creates food
        food = new food()
        
        

    //update positions
    self.snake.update()
    self.food.update()
    
    //check if snake eat food if true remove

    self.checkIfSnakeEatFood()
    
    //Earn points
    
    //forget food already eaten

    self.food.filter(isInScreen())
    
    //erase canvas
    ctx.clearRect()
    
    //draw
    self.snake.draw()
    self.food.draw()
    Frame(loop)
   ```
   

 Snake.js
 
    Snake(canvas) {
      self.x
      self.y
      self.direction
      self.size
      self.speed
      self.canvas
      self.ctx
    }

    Snake.prototype.setDirection()
    Snake.prototype.checkIfSnake.EatFood() //than it will be also for the points
    Snake.prototype.collided()
    Snake.prototype.update()
    Snake.prototype.draw()
    
Food.js

    Food(canvas, x, y) {
      self.x
      self.y
      self.direction 0
      self.size
      self.canvas
      self.ctx
    }

    Food.prototype.update()
    Food.prototype.draw()
    Food.prototype.isInScreen()


    Math Random
    Place in canvas (x,y)

Transitions

    - splashScreen()
      - destroyGameOver(if)
      - buildSplash()
      - addEventListener(startGame)


    - startGame()
      - destroySplash()
      - destroyGameOver()
      - create new Game()
      - game.start()


    - gameOver()
      - destroyGame()
      - buildGameOver()
      - addEventListener( if splashScreen, else startGame)

