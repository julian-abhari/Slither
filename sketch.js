var slither;
var time;
var phase = 2;
let img;

function preload() {
	img = loadImage('texture.png');
}

function setup() {
	createCanvas(600, 600);
	slither = new Slither(width / 2, height / 2, 200);
	time = 0;
}

function draw() {
	clear();
	background(100, 20, 255);
	blendMode(BLEND);

	var x = map(cos(4*time - phase), -1, 1, 0, width);
	var y = map(sin(4*time), -1, 1, 0, height);
	slither.show(x, y);
	time += 0.01;
}
