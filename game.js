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
}

Player.prototype.draw = function () {
    clearCtxPlayer();
    ctxPlayer.drawImage(tiles,this.srcX,this.srcY,this.weight,this.height,this.drawX,this.drawY,this.weight,this.height);
};

Player.prototype.clear = function () {
    ctxPlayer.clear();
};

Player.prototype.update = function () {
     this.drawX +=this.speed;

};


function Enemy() {

    this.srcX = 0;
    this.srcY = 110;
    this.drawX = 500;
    this.drawY = 30;
    this.width = 150;
    this.height = 110;

    this.speed = 8;
}

Enemy.prototype.draw = function(){
    ctxEnemy.drawImage(tiles, this.srcX,this.srcY,this.width, this.height, this.drawX,this.drawY,this.width, this.height);
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

}

function draw () {
    player.draw();

    enemy.draw();
}

function update() {
    player.update();
}

function loop() {

    if(isPlaying){
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
    ctxMap.drawImage(background,0,0,gameWidth,gameHeight,0,0,gameWidth,gameHeight);
}

function clearCtxPlayer() {
    ctxPlayer.clearRect(0,0,gameWidth,gameHeight);
}

