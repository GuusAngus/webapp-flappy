// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(1910, 500, Phaser.AUTO, 'game', stateActions);
var score = -1;
var labelScore;
var player;
var adder;
var pipes = [];
var gapSize
var gapMargin
var blockHeight
pipeInterval = 2.5;
//var truth = false;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {

    game.load.audio("score", "../assets/point.ogg");
    game.load.image("bondImg", "../assets/jamesBond.gif");
    game.load.image("playerImg", "../assets/chicken-head-hi.png");
    game.load.image("pipe", "../assets/pipe_yellow.png");
}






function addPipeBlock(x, y) {
    var pipeBlock = game.add.sprite(x,y,"pipe");
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -800;
}
Math.max (0, score);

    function generatePipe() {
    // calculate a random position for the gap
    var gap = game.rnd.integerInRange(1 ,5);
    // generate the pipes, except where the gap should be
    for (var count=0; count<10; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(1910, count*50);
        }
    }
        changeScore();
}







/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene


    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);

    game.input
        .onDown
        .add(clickHandler);
    game.stage.setBackgroundColor("FF9933");

    game.add.text(700, 50, "Chicken Escape",{font: "30px Arial", fill: "#FFFFFF"});

    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(playerJump);

    player = game.add.sprite(955, 250, "playerImg");
    player.angle = 90;
    player.width = 40;
    player.height = 55;



    labelScore = game.add.text(20, 20, "0");

    player.x = 150;
    player.y = 200;
    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

    game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
        .onDown.add(moveLeft);

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.velocity.y = -200;
    player.body.gravity.y = 1000;

generatePipe();







}
function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");

}
function playerJump() {
    player.body.velocity.y = -400;
    game.sound.play("score");

}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());
}
function moveRight() {
    player.x = player.x + 10
}
    function moveLeft() {
        player.x = player.x - 10

}
/*
 * This function updates the scene. It is called for every new frame.
 */
function update() {
    game.physics.arcade
        .overlap(player,
    pipes,
    gameOver);
    player.anchor.setTo(0.5, 0.5);
    player.rotation = Math.atan(player.body.velocity.y/800) + 1.5;

    if (player.y > 450 || player.y < 0)
    {
        gameOver();

    }







}

function gameOver(){
    game.destroy();




}

