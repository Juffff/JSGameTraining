window.onload = init;

var map;
var ctxMap;

var player;
var ctxPlayer;

//var enemy;
var enemies = [];
var ctxEnemy;

var stats;
var ctxStats;

var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var gameWidth = w;
var gameHeight = h* 0.85;

var background = new Image();
background.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";

var requestAnimFrame = window.requestAnimFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;

var isPlaying;

//For creating enemies

var spawnInterval;
var spawnTime = 3000;
var spawnAmount = 15;


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

    if (this.drawY > gameHeight - this.height) {
        this.drawY = gameHeight - this.height;
    }

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
    this.srcX2 = 0;
    this.srcY = 110;
    this.drawX = gameWidth + Math.floor(Math.random() * gameHeight);
    this.drawY = Math.floor(Math.random() * gameHeight);
    this.width = 100;
    this.height = 110;

    this.speed = 10;
}

Enemy.prototype.draw = function () {
    //clearCtxEnemy();
    ctxEnemy.drawImage(tiles, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);

};


Enemy.prototype.update = function () {
    this.drawX -= this.speed;
    if (this.drawX < -this.width) {
        this.destroy();
    }

    if (this.drawY > gameHeight - this.height) {
        this.destroy();
    }


};

Enemy.prototype.clear = function () {
    ctxEnemy.clear();
};

Enemy.prototype.destroy = function(){
    enemies.splice(enemies.indexOf(this),1);
}

function spawnEnemies(count) {
    for (var i = 0; i < count; i++) {
        enemies[i] = new Enemy();
    }
}

function startCreatingEnemies() {
    stopCreatingEnemies();
    spawnInterval = setInterval(function(){spawnEnemies(spawnAmount)}, spawnTime);
}
function stopCreatingEnemies() {
    clearInterval(spawnInterval);

}

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

    stats = document.getElementById("stats");
    ctxStats = stats.getContext("2d");
    stats.width = gameWidth;
    stats.height = gameHeight;

    ctxStats.fillStyle = "red";
    ctxStats.font = "bold 3em Verdana";


    player = new Player();
    // enemy = new Enemy();
    startLoop();
    updateStats();
    spawnEnemies(1);
    document.addEventListener("keydown", checkKeyDown, false);
    document.addEventListener("keyup", checkKeyUp, false);

}

function draw() {
    player.draw();
    clearCtxEnemy();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function update() {
    player.update();
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update();
    }


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
    startCreatingEnemies();
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

function updateStats() {
    ctxStats.clearRect(0, 0, gameWidth, gameHeight);
    ctxStats.fillText("Player", gameWidth*0.85,50);
}
