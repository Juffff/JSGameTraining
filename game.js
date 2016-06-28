window.onload = init;

var  map;
var ctxMap;

var player;
var ctxPlayer;

var drawButton;
var clearButton;

var gameWidth = 800;
var gameHeight = 500;

var background = new Image();
background.src = "img/bg.jpg";

var tiles = new Image();
tiles.src = "img/tiles.png";


function init() {
    map = document.getElementById("map");
    ctxMap = map.getContext("2d");
    map.width = gameWidth;
    map.height = gameHeight;
    
    player = document.getElementById("player");
    ctxPlayer = player.getContext("2d");
    player.width = gameWidth;
    player.height = gameHeight;

    drawButton = document.getElementById("drawButton");
    clearButton = document.getElementById("clearButton");
    drawButton.addEventListener("click", drawRect, false);
    clearButton.addEventListener("click", clearRect, false);
    drawBg();
    drawPlayer();

}

function drawRect() {
    ctxMap.fillStyle = "#3d3d3d";
    ctxMap.fillRect(10, 10, 100, 100);
}

function clearRect() {
    ctxMap.clearRect(0,0,800,500);
}

function drawBg() {
    ctxMap.drawImage(background,0,0,800,500,0,0,800,500);
}

function drawPlayer() {
    ctxMap.drawImage(tiles,0,0,150,130,0,0,150,130);
}

