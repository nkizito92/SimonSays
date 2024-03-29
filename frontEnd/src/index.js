const onlineUrl = "https://simon-says-back-end.herokuapp.com"
const localUrl = "http://localhost:3000/"
const uRLs = localUrl
let btn = new ButtonsAdapter(`${uRLs}/buttons`);
const main = document.querySelector("main");
const easy = document.querySelector("#easy")
const hard = document.querySelector("#hard")

const easyMode = "easy"
const hardMode = "hard"
let difficultySet = ""
const startGame = document.querySelector("#startbtn");
let points = document.querySelector("#points");
let point = 0;
const keyButtons = document.querySelector("#keysbuttons");
let playerScore = document.querySelector("#players")
let youScored = document.querySelector("#yourScore")
playerScore.hidden = true;
youScored.hidden = true;
let lifePoints = 2;
easy.addEventListener("click", () => {
  lifeScore(lifePoints = 3)
  document.querySelector("#startGame").play();
  startsTheGame(easyMode);
  difficultySet = easyMode;
})
hard.addEventListener("click", () => {
  lifeScore(lifePoints = 1)
  document.querySelector("#startGame").play();
  startsTheGame(hardMode);
  difficultySet = hardMode;
})
let life = document.querySelector("#life")
let lifeScore = (lifepoint) => life.innerHTML = `Lives: ${lifepoint}`
lifeScore(lifePoints);
life.hidden = true;
// Welcoming
let welcome = document.querySelector("#welcome");
welcome.addEventListener("click", welcoming);
function welcoming() {
  startGame.hidden = true;
  easy.hidden = true;
  hard.hidden = true;
  welcome.innerHTML =
    "Press what Simon clicks <br/><br/><br/> Simon's <span style=color:red;>Red</span> and you're <span style=color:green;>green</span>!! <br/><br/> Remembering The Sound is Key!!";
  setTimeout(() => {
    welcome.innerHTML =
      "Press Start to Play the game!! <br/> <br/> Click here for <br/> instructions again!!";
    startGame.hidden = false;
    easy.hidden = false;
    hard.hidden = false;
  }, 7000);
}

keyButtons.hidden = true;
// player and buttons set.
let plyrSelectedBtns = [];
let compArrSet = [];
let checkIndex = 0;
function startsTheGame(difficulty) {
  easy.hidden = true
  hard.hidden = true
  life.hidden = false;
  welcome.hidden = true;
  startGame.hidden = true;
  let buttonCount = keyButtons.childElementCount
  if (buttonCount === 0) {
    loading.innerHTML = "Loading..."
    btn.fetchButtons()
  } else {
    setTimeout(() => cpuPressbuttons(difficulty), 3000)
  }
  keyButtons.hidden = false;
  points.innerHTML = `Score: ${point}`;
  point++;
  plyrSelectedBtns = [];
  compArrSet = [];
  checkIndex = 0;
  startGame.removeEventListener("click", startsTheGame);
  buttonSet();
}
let copyArr = [4]
//cpu clicks buttons set
function cpuPressbuttons(difficulty) {
  let started = -1;
  if(difficulty === "easy"){
    // if(copyArr.length < point) {
      let indexSet = Math.floor(6 * Math.random(1));
      copyArr.push(indexSet)
    // }

  } else {
      copyArr = new Array();
    for (let i = 0; i < point; i++) {
        let indexSet = Math.floor(6 * Math.random(1));
        copyArr.push(indexSet);
      }
    }
  
  compArrSet = copyArr;
  setInterval(() => {
    if (started++ < compArrSet.length - 1) {
      let btton = document.querySelectorAll(".keybutton");
      let selectedBtn = btton[compArrSet[started]];
      selectedBtn.querySelector("audio").load();
      selectedBtn.querySelector("audio").play();
      colorToggle(selectedBtn, "red", 900 - point * 100);
    } else clearInterval;
  }, 500);
}

function startPressCpuButton(cpu) {
  plyrSelectedBtns = [];
  var arrSet = new Array();
  arrSet.push(cpu[0])
  compArrSet = arrSet;
  if (keyButtons.childElementCount === 6)
    (setTimeout(() => rePressCpuButtons(compArrSet), 300))
}

function rePressCpuButtons(cpu) {
  plyrSelectedBtns = [];
  var arrSet = new Array();
  let started = -1;
  arrSet = [...cpu]
  compArrSet = arrSet;
  setInterval(() => {
    if (started++ < arrSet.length - 1) {
      let btton = document.querySelectorAll(".keybutton");
      let selectedBtn = btton[arrSet[started]];
      selectedBtn.querySelector("audio").load();
      selectedBtn.querySelector("audio").play();
      colorToggle(selectedBtn, "red", 900 - point * 100);
    } else clearInterval;
  }, 500);
}

//User clicks buttons
function clicked(e, cpuArr) {
  const plyNum = parseInt(e.target.id.split("key-")[1]) - 1;
  colorToggle(e.target, "green", 300);
  checkUsersClick(plyNum, cpuArr);
}
function checkUsersClick(plyNum, cpuArr) {
  if (cpuArr[checkIndex] === plyNum) {
    plyrSelectedBtns.push(plyNum);
    checkIndex++;
    if (plyrSelectedBtns.length === cpuArr.length) {
      document.querySelector("#passed").play()
      startsTheGame(difficultySet);
    }
  }
  else if (cpuArr[checkIndex] !== plyNum) {
    lifePoints--
    keyButtons.children[plyNum].firstElementChild.pause()
    let failedSounds = {
      0: document.querySelector("#failSound2"),
      1: document.querySelector("#failSound3")
    }
    failedSounds[Math.floor(2 * Math.random(1))].play()
    checkIndex = 0;
    life.innerHTML = `Lives: ${lifePoints}`
    setTimeout(() => rePressCpuButtons(cpuArr), 3000)
  }

  if (lifePoints === 0) {
    document.querySelector("#failSound2").pause()
    document.querySelector("#failSound3").pause()
    plyrSelectedBtns = [];
    failedGame();
  }
}

function failedGame() {
  let failed = document.querySelector("#failed");
  failed.innerHTML = "Wrong Button <br/> GameOver!!";
  Button.removeButtons();
  document.querySelector("#failSound").play();
  points.hidden = true;
  setTimeout(() => {
    failed.hidden = true;
    userForm();
    createTheUser();
  }, 3000);
}

keyButtons.addEventListener("click", e => {
  e.target.querySelector("audio").load();
  e.target.querySelector("audio").play();
  clicked(e, compArrSet);
});
function colorToggle(obj, color, time) {
  obj.style.backgroundColor = color;
  if (time <= 100) time = 100;
  if (obj.style.backgroundColor === color)
    setTimeout(() => (obj.style.backgroundColor = ""), time);
}

function buttonSet() {
  const endGame = document.querySelector("#endGame");
  endOrRestartGameBtnConfig(endGame);
}

function endOrRestartGameBtnConfig(endGame) {
  // End Game Event
  endGame.addEventListener("click", () => {
    window.location.reload();
  });
}
startGame.addEventListener("click", () => {
  document.querySelector("#startGame").play();
  startsTheGame();
});

// Form action
let form = document.querySelector("form");
function userForm() {
  youScored.hidden = false
  playerScore.hidden = false;
  points.hidden = false;
  form.hidden = false;
  document.getElementById("name").focus();
  let yourScore = document.getElementsByName("scored");
  yourScore.hidden = true;
  yourScore.value = point - 1;
}
let theUsers = new UsersAdapter(`${uRLs}/users`);
function submitUser(name, scored) {
  theUsers.fetchScore(name, scored);
}
// Create user
let displayThe = new GamesAdapter(`${uRLs}/games`);
function createTheUser() {

  const createUser = document.querySelector("#createUser");
  let NewUser = document.querySelector("#name");
  displayThe.fetchGames();
  createUser.addEventListener("click", event => {
    event.preventDefault();
    if (NewUser.value === "") {
      NewUser.focus();
      document.querySelector("#failSound").load();
      document.querySelector("#failSound").play();
      NewUser.style.border = "2px red solid";
      NewUser.placeholder = "Name is Required";
    } else {
      form.hidden = true;
      document.querySelector("#audioPost").play();
      submitUser(NewUser.value, point - 1);
      setTimeout(() => window.location.reload(), 5000);
    }
  });
}