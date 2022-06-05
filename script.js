// 'The Fox' game designed by Alexander Zelenkov in 2022
// http://zelenkov.space/fox/
// lll555@yandex.ru 


let isReady = false;
let gameNotRun = true;
var level = 1;
var clue = false; 
var clueReady = true;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const keyboard = {
	up: false,
	down: false,
	left: false,
	right: false,
	up2: false,
	down2: false,
	left2: false,
	right2: false
}

//-----------------------------------------------
//development zone for building new levels of game

// canvas.addEventListener('mousemove', function(event) {
// 	console.log(event.offsetX, event.offsetY);
// });

// Do not forget to switch data source in get_data

// canvas.addEventListener('mousedown', (e)=>{
// 	//console.log('Fire!');
// 	//addBushes(e);
// 	//addRock(e);
// 	//addTree(e);
// 	//addLittleTree(e);
// 	//addStrawberries(e);
// 	addLeafs(e);
// });

// function addRock(e) {
// 	let rockSize = Math.floor(Math.random()*11)*2;
// 	let rockRandom = Math.floor(Math.random()*4);
// 	obstData.push([e.offsetX,e.offsetY, 40+rockSize, 40+rockSize, 701+rockRandom]);
// 	obstaclesData.innerHTML = JSON.stringify(obstData);
// }

// function addBushes(e) {
// 	let bushSize = Math.floor(Math.random()*6)*2;
// 	let bushRandom = Math.floor(Math.random()*3);
// 	obstData.push([e.offsetX,e.offsetY,30+bushSize, 30+bushSize, 708+bushRandom]);
// 	obstaclesData.innerHTML = JSON.stringify(obstData);
// }

// function addLittleTree(e) {
// 	obstData.push([e.offsetX,e.offsetY,40,80,707]);
// 	obstaclesData.innerHTML = JSON.stringify(obstData);
// }

// function addTree(e) {
// 	obstData.push([e.offsetX,e.offsetY,96,96,705]);
// 	obstaclesData.innerHTML = JSON.stringify(obstData);
// 	obstData.push([e.offsetX,e.offsetY-72,68,48,706]);
// 	obstaclesData.innerHTML = JSON.stringify(obstData);
// }

// function addStrawberries(e) {
// 	let stwbSize = Math.floor(Math.random()*3)*2;
// 	stwbData.push([e.offsetX,e.offsetY, 10+stwbSize, 10+stwbSize]);
// 	strawberryData.innerHTML = JSON.stringify(stwbData);
// }

// function addLeafs(e) {
// 	let leafSize = Math.floor(Math.random()*6)*2;
// 	let leafRandom = Math.floor(Math.random()*5);
// 	leafData.push([e.offsetX,e.offsetY,20+leafSize,20+leafSize,801+leafRandom]);
// 	leafsData.innerHTML = JSON.stringify(leafData);
// }

// End of developer's zone
//-------------------------------------------------

class Fox {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.w = 26;
		this.h = 30;
		this.speed = 2;
		this.score = 0;
		this.right = true;
	}

	draw(ctx) {
		if(this.right){
			ctx.drawImage(foxRightImage, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
		}else{
			ctx.drawImage(foxLeftImage, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
		}
		
	}

	move() {
		let oldX = this.x;
		let oldY = this.y;
		if(keyboard.up){this.y -= this.speed;}
		if(keyboard.down){this.y += this.speed;}
		if(keyboard.left){this.x -= this.speed;}
		if(keyboard.right){this.x += this.speed;}
		if(collisionWithGap(this,obstData)>=0){
			this.x = oldX;
			this.y = oldY;
		}
		if(this.x<0 || this.x>canvas.width || this.y<0 || this.y>canvas.height){
			this.x = oldX;
			this.y = oldY;
		}
	}

	status() {
		for(var i=0; i<stwbData.length; i++){
			if(collision(this,stwbData[i])){
				stwbData.splice(i, 1);
				audio1Eat.pause();
				audio1Eat.currentTime = 0;
				audio1Eat.play();
				this.score +=1;
				foxScore.innerHTML = this.score;
			}
		}
	}
}

class FoxTwo {
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.w = 26;
		this.h = 30;
		this.speed = 2;
		this.score = 0;
		this.right = true;
	}

	draw(ctx) {
		if(this.right){
			ctx.drawImage(foxBlueRightImage, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
		}else{
			ctx.drawImage(foxBlueLeftImage, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
		}
	}

	move() {
		let oldX = this.x;
		let oldY = this.y;
		if(keyboard.up2){this.y -= this.speed;}
		if(keyboard.down2){this.y += this.speed;}
		if(keyboard.left2){this.x -= this.speed;}
		if(keyboard.right2){this.x += this.speed;}
		if(collisionWithGap(this,obstData)>=0){
			this.x = oldX;
			this.y = oldY;
		}
		if(this.x<0 || this.x>canvas.width || this.y<0 || this.y>canvas.height){
			this.x = oldX;
			this.y = oldY;
		}

	}

	status() {
		for(var i=0; i<stwbData.length; i++){
			if(collision(this,stwbData[i])){
				stwbData.splice(i, 1);
				audio2Eat.pause();
				audio2Eat.currentTime = 0;
				audio2Eat.play();
				this.score +=1;
				foxBlueScore.innerHTML = this.score;
			}
		}
	}
}

function collision(person,thing) {
	//this is collision function
	//person is like a fox and thing=stwbData[i]
	//each has x,y,width,height
	if(person.x-person.w/2<=thing[0]+(thing[2])/2 && 
		person.x+person.w/2>=thing[0]-(thing[2])/2 &&
		person.y-person.h/2<=thing[1]+(thing[3])/2 && 
		person.y+person.h/2>=thing[1]-(thing[3])/2
	){
		return true;
	}
}

function collisionWithGap(person,things) {
	//the same as collision function but with gap for better UX and for loop
	for(var i=0; i<things.length; i++){
			if(person.x-person.w/3<=things[i][0]+(things[i][2])/3 && 
				person.x+person.w/3>=things[i][0]-(things[i][2])/3 &&
				person.y-person.h/3<=things[i][1]+(things[i][3])/3 && 
				person.y+person.h/3>=things[i][1]-(things[i][3])/2
			){
				return i;
			}
		}
}

class Stwb {
	constructor(x,y,w,h){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
	
	draw(ctx) {
		ctx.drawImage(stwbImage, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
	}
}

class Leaf {
	constructor(x,y,w,h,image){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.image = image;
	}
	
	draw(ctx) {
		let imgID = 0;
		switch(this.image){
			case 801:
				imgID = leafImage;
				break;
			case 802:
				imgID = leaf2Image;
				break;
			case 803:
				imgID = leaf3Image;
				break;
			case 804:
				imgID = leaf4Image;
				break;
			case 805:
				imgID = leaf5Image;
				break;
		}
		ctx.drawImage(imgID, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
	}
}

class Obstacles {
	constructor(x,y,w,h,image){
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.image = image;
	}
	
	draw(ctx) {
		let imgID = 0;
		switch(this.image){
			case 701:
				imgID = rockImage;
				break;
			case 702:
				imgID = rock2Image;
				break;
			case 703:
				imgID = rock3Image;
				break;
			case 704:
				imgID = rock4Image;
				break;
			case 705:
				imgID = treeOneBottomImage;
				break;
			case 706:
				imgID = treeOneUpperImage;
				break;
			case 707:
				imgID = treeTwo;
				break;
			case 708:
				imgID = bush1Image;
				break;
			case 709:
				imgID = bush2Image;
				break;
			case 710:
				imgID = bush3Image;
				break;
		}
		ctx.drawImage(imgID, this.x-this.w/2, this.y-this.h/2, this.w, this.h);
	}
}

var fox = new Fox(60,20);
var foxBlue = new FoxTwo(20,20);

function drawAll() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(backgroundImage,0,0);
	for(var i=0; i<stwbData.length; i++){
		var stwb = new Stwb(stwbData[i][0], stwbData[i][1], stwbData[i][2], stwbData[i][3]);
		stwb.draw(ctx);
	}
	for(var i=0; i<obstData.length; i++){
		var obst = new Obstacles(obstData[i][0], obstData[i][1], obstData[i][2], obstData[i][3], obstData[i][4]);
		obst.draw(ctx);
	}
	for(var i=0; i<leafData.length; i++){
		if(collision(fox,leafData[i]) || collision(foxBlue,leafData[i]) || clue) {
			var leaf = new Leaf(leafData[i][0], leafData[i][1]-(leafData[i][3])/2, leafData[i][2], (leafData[i][3])/3, leafData[i][4]);
		} else {var leaf = new Leaf(leafData[i][0], leafData[i][1], leafData[i][2], leafData[i][3], leafData[i][4]);}
		leaf.draw(ctx);
	}
	fox.draw(ctx);
	foxBlue.draw(ctx);
}

function gameStatus() {
	var stwbLeft = stwbData.length;
	berriesLeft.innerHTML = stwbLeft;
	if(stwbLeft==0){
		final();
	}
}

// Main loop
function update() {
	fox.move();
	fox.status();
	foxBlue.move();
	foxBlue.status();
	drawAll();
	gameStatus();
	if(isReady){
		requestAnimationFrame(update);
	}
}

// Greeting and safe start
//-------------------
window.onload=()=>{
	ctx.fillStyle = '#d8e9a8';
	ctx.fillRect(240,120,320,260);
	ctx.fillStyle = '#1e5128';
	ctx.fillRect(245,125,310,250);
	ctx.clearRect(250,130,300,240);
	ctx.drawImage(foxBlueLeftImage, 340, 225, 26, 30);
	ctx.drawImage(foxWin, 380, 168, 78, 90);
	ctx.font = 'bold 24px Josefin Sans, sans-serif';
	ctx.fillStyle = '#191a19';
	ctx.fillText('Press "Enter"', 325,310);
	ctx.fillText('for start', 350,340);
	document.addEventListener('keydown',(e)=>{
		if(e.key=='Enter'){
			start();
		}
	});
}

//-------------------

function start() {
	if(gameNotRun){
		isReady = true;
		audioBackground.play();
		update();
	}
	gameNotRun = false;
}

function stop() {
	isReady = false;
	gameNotRun = true;
	audioBackground.pause();
}

function reset() {
	foxScore.innerHTML = 0;
	foxBlueScore.innerHTML = 0;
	audioBackground.currentTime = 0;
	if(level==1){
		fox = new Fox(60,20);
		foxBlue = new FoxTwo(20,20);
		obstData = JSON.parse(obstacles1Data.innerHTML);
		stwbData = JSON.parse(strawberry1Data.innerHTML);
		leafData = JSON.parse(leafs1Data.innerHTML);
	}
	if(level==2){
		fox = new Fox(60,20);
		foxBlue = new FoxTwo(20,20);
		obstData = JSON.parse(obstacles2Data.innerHTML);
		stwbData = JSON.parse(strawberry2Data.innerHTML);
		leafData = JSON.parse(leafs2Data.innerHTML);
	}
	if(level==3){
		fox = new Fox(60,20);
		foxBlue = new FoxTwo(20,20);
		obstData = JSON.parse(obstacles3Data.innerHTML);
		stwbData = JSON.parse(strawberry3Data.innerHTML);
		leafData = JSON.parse(leafs3Data.innerHTML);
		level = 0;
	}
}

function final() {
	stop();
	ctx.fillStyle = '#d8e9a8';
	ctx.fillRect(240,120,320,260);
	ctx.fillStyle = '#1e5128';
	ctx.fillRect(245,125,310,250);
	ctx.clearRect(250,130,300,240);
	ctx.fillStyle = '#191a19';
	if(fox.score > foxBlue.score){
		ctx.drawImage(foxWin, 360, 168, 78, 90);
		ctx.fillText('Red fox is winner!', 303,300);
	}else{
		ctx.drawImage(foxBlueWin, 360, 168, 78, 90);
		ctx.fillText('Blue fox is winner!', 303,300);
	}
	level += 1;
	reset();
	//click for next level
	ctx.fillStyle = '#1e5128';
	ctx.fillRect(315,310,170,40);
	ctx.fillStyle = '#d8e9a8';
	ctx.fillRect(320,315,160,30);
	ctx.fillStyle = '#191a19';
	ctx.fillText('Next level', 345,340);
	canvas.addEventListener('mousedown', (e)=>{
		if(e.offsetX>315 && e.offsetX<485 && e.offsetY<350 && e.offsetY>310){
			start();
		}
	})

}

document.onkeydown=(e) => {
	if(e.key == 'ArrowUp'){keyboard.up = true};
	if(e.key == 'ArrowDown'){keyboard.down = true};
	if(e.key == 'ArrowLeft'){
		keyboard.left = true;
		fox.right = false;
	};
	if(e.key == 'ArrowRight'){
		keyboard.right = true;
		fox.right = true;
	};
	if(e.key == 'w'){keyboard.up2 = true};
	if(e.key == 's'){keyboard.down2 = true};
	if(e.key == 'a'){
		keyboard.left2 = true;
		foxBlue.right = false;
	};
	if(e.key == 'd'){
		keyboard.right2 = true;
		foxBlue.right = true;
	};
};

document.onkeyup=(e) => {
	if(e.key == 'ArrowUp'){keyboard.up = false};
	if(e.key == 'ArrowDown'){keyboard.down = false};
	if(e.key == 'ArrowLeft'){keyboard.left = false};
	if(e.key == 'ArrowRight'){keyboard.right = false};
	if(e.key == 'w'){keyboard.up2 = false};
	if(e.key == 's'){keyboard.down2 = false};
	if(e.key == 'a'){keyboard.left2 = false};
	if(e.key == 'd'){keyboard.right2 = false};
};

startButton.onclick=()=>{start()};
pauseButton.onclick=()=>{stop()};

clueButton.onclick=()=>{
	if(clueReady){
		clue = true;
		setTimeout(()=>{clue=false}, 100);
		clueReady = false;
		setTimeout(()=>{clueReady=true}, 1000); 
	}
};
let musicPlay = true;
musicButton.onclick=()=>{
	if(musicPlay){
		audioBackground.pause();
		musicPlay = false;
		musicButton.innerHTML = 'Music On';
	}else{
		audioBackground.play();
		musicPlay = true;
		musicButton.innerHTML = 'Music Off';
	}
};
