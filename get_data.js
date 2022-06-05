// Audio data
const audio1Eat = document.getElementById('audio-eat-1');
audio1Eat.volume = 0.4;
const audio2Eat = document.getElementById('audio-eat-2');
const audioBackground = document.getElementById('audio-background');
audioBackground.loop = true;
audioBackground.volume = 0.7;
// Image data
const backgroundImage = document.getElementById('background');
const foxRightImage = document.getElementById('fox');
const foxLeftImage = document.getElementById('fox-left');
const foxWin = document.getElementById('fox-win');
const foxBlueRightImage = document.getElementById('fox-blue');
const foxBlueLeftImage = document.getElementById('fox-blue-left');
const foxBlueWin = document.getElementById('fox-blue-win');
const stwbImage = document.getElementById('strawberry');
const berriesLeft = document.getElementById('berries-left');
const foxScore = document.getElementById('fox-score');
const foxBlueScore = document.getElementById('fox-blue-score');
const rockImage = document.getElementById('rock');
const rock2Image = document.getElementById('rock2');
const rock3Image = document.getElementById('rock3');
const rock4Image = document.getElementById('rock4');
const treeOneBottomImage = document.getElementById('tree1bottom');
const treeOneUpperImage = document.getElementById('tree1upper');
const treeTwo = document.getElementById('tree2');
const bush1Image = document.getElementById('bush1');
const bush2Image = document.getElementById('bush2');
const bush3Image = document.getElementById('bush3');
const leafImage = document.getElementById('leaf');
const leaf2Image = document.getElementById('leaf2');
const leaf3Image = document.getElementById('leaf3');
const leaf4Image = document.getElementById('leaf4');
const leaf5Image = document.getElementById('leaf5');
// Buttons
const startButton = document.getElementById('button-start');
const pauseButton = document.getElementById('button-pause');
const clueButton = document.getElementById('button-clue');
const musicButton = document.getElementById('button-music');

// Data for scene Level-1
const obstacles1Data = document.getElementById('obstacles-data-1');
const strawberry1Data = document.getElementById('strawberry-data-1');
const leafs1Data = document.getElementById('leafs-data-1');
// Data for scene Level-2
const obstacles2Data = document.getElementById('obstacles-data-2');
const strawberry2Data = document.getElementById('strawberry-data-2');
const leafs2Data = document.getElementById('leafs-data-2');
// Data for scene Level-3
const obstacles3Data = document.getElementById('obstacles-data-3');
const strawberry3Data = document.getElementById('strawberry-data-3');
const leafs3Data = document.getElementById('leafs-data-3');

// Initial data load (Level-1)
let obstData = JSON.parse(obstacles1Data.innerHTML);
let stwbData = JSON.parse(strawberry1Data.innerHTML);
let leafData = JSON.parse(leafs1Data.innerHTML);

// Development data zone
//---------------------------------------------------------------------------
// const obstaclesData = document.getElementById('obstacles-data');
// const strawberryData = document.getElementById('strawberry-data');
// const leafsData = document.getElementById('leafs-data');

// let obstData = JSON.parse(obstaclesData.innerHTML);
// let stwbData = JSON.parse(strawberryData.innerHTML);
// let leafData = JSON.parse(leafsData.innerHTML);
//---------------------------------------------------------------------------

// Fox image from free pictures bank: https://toppng.com/free-image/free-game-character-PNG-free-PNG-Images_87477
// All other pictures created by Alexander Zelenkov