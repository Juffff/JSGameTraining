window.onload = init;

var map;
var ctxMap;

var player;
var ctxPlayer;

var enemy;
var ctxEnemy;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var requestAnimFrame = window.requestAnimFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

var isPlaying;

function Player() {
    this.srcX = 0;
    this.srcY = 0;
    this.drawX = 0;
    this.drawY = 0;
    this.weight = 150;
    this.height = 110;

    this.speed = 5;

    //For keys
    this.isUp = false;
    this.isDown = false;
    this.isLeft = false;
    this.isRight = false;

}

Player.prototype.draw = function () {
    clearCtxPlayer();
    ctxPlayer.drawImage(tiles, this.srcX, this.srcY, this.weight, this.height, this.drawX, this.drawY, this.weight, this.height);
};

Player.prototype.chooseDirection = function () {
    if (this.isUp) {
        this.drawY -= this.speed;
    }

    if (this.isDown) {
        this.drawY += this.speed;
    }

    if (this.isLeft) {
        this.drawX -= this.speed;
    }

    if (this.isRight) {
        this.drawX += this.speed;
    }
}

Player.prototype.update = function () {
    this.chooseDirection();
    if (this.drawX > gameWidth - 300) {
        this.drawX = gameWidth - 300;
    }

    if (this.drawX < 0) {
        this.drawX = 0;
    }

    if (this.drawY < 0) {
        this.drawY = 0;
    }

   /* if (this.drawY > gameHeight-this.height) {
        this.drawY = gameHeight;
    }*/
console.log(this.drawY);


};

function checkKeyDown(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    if (keyChar == "W") {
        player.isUp = true;
        e.preventDefault();
    }

    if (keyChar == "S") {
        player.isDown = true;
        e.preventDefault();
    }

    if (keyChar == "A") {
        player.isLeft = true;
        e.preventDefault();
    }

    if (keyChar == "D") {
        player.isRight = true;
        e.preventDefault();
    }
}

function checkKeyUp(e) {
    var keyID = e.keyCode || e.which;
    var keyChar = String.fromCharCode(keyID);
    if (keyChar == "W") {
        player.isUp = false;
        e.preventDefault();
    }

    if (keyChar == "S") {
        player.isDown = false;
        e.preventDefault();
    }

    if (keyChar == "A") {
        player.isLeft = false;
        e.preventDefault();
    }

    if (keyChar == "D") {
        player.isRight = false;
        e.preventDefault();
    }
}

function Enemy() {

    this.srcX = 0;
    this.srcY = 110;
    this.drawX = gameWidth + Math.floor(Math.random() * 10);
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.width = 150;
    this.height = 110;

    this.speed = 2;
}

Enemy.prototype.draw = function () {
    clearCtxEnemy();
    ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Enemy.prototype.update = function () {
    this.drawX -= this.speed;
};

Enemy.prototype.clear = function () {
    ctxEnemy.clear();
};


function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");
    map.width = gameWidth;
    map.height = gameHeight;

    player = document.getElementById("player");
    ctxPlayer = player.getContext("2d");
    player.width = gameWidth;
    player.height = gameHeight;

    enemy = document.getElementById("enemy");
    ctxEnemy = enemy.getContext("2d");
    enemy.height = gameHeight;
    enemy.width = gameWidth;
    drawBg();


    player = new Player();
    enemy = new Enemy();
    startLoop();

    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);

}

function draw() {
    player.draw();

    enemy.draw();
}

function update() {
    player.update();
    enemy.update();
}

function loop() {

    if (isPlaying) {
        draw();
        update();
        requestAnimFrame(loop);
    }

}

function startLoop() {
    isPlaying = true;
    loop();
}

function stopLoop() {
    isPlaying = false;
}

function drawBg() {
    ctxMap.drawImage(background, 0, 0, gameWidth, gameHeight, 0, 0, gameWidth, gameHeight);
}

function clearCtxPlayer() {
    ctxPlayer.clearRect(0, 0, gameWidth, gameHeight);
}


function clearCtxEnemy() {
    ctxEnemy.clearRect(0, 0, gameWidth, gameHeight);
}

