
const uRLs = "https://simon-says-back-end.herokuapp.com"
let btn = new ButtonsAdapter(`${uRLs}/buttons`);
const main = document.querySelector("main");
const startGame = document.querySelector("#startbtn");
let points = document.querySelector("#points");
let point = 0;
const keyButtons = document.querySelector("#keysbuttons");
let playerScore = document.querySelector("#players")
playerScore.hidden = true;
// Welcoming
let welcome = document.querySelector("#welcome");
welcome.addEventListener("click", welcoming);
function welcoming() {
  startGame.hidden = true;
  welcome.innerHTML =
    "Press what Simon clicks <br/><br/><br/> Simon's <span style=color:red;>Red</span> and you're <span style=color:green;>green</span>!! <br/><br/> Remembering The Sound is Key!!";
  setTimeout(() => {
    welcome.innerHTML =
      "Press Start to Play the game!! <br/> <br/> Click here for <br/> instructions again!!";
    startGame.hidden = false;
  }, 7000);
}

// player and buttons set.
let plyrSelectedBtns = [];
let compArrSet = [];
let checkIndex = 0;
function startsTheGame() {
  welcome.hidden = true;
  startGame.hidden = true;
  if (keyButtons.childElementCount === 0) {
    btn.fetchButtons();
  }
  points.innerHTML = `Score: ${point}`;
  point++;
  plyrSelectedBtns = [];
  checkIndex = 0;
  startGame.removeEventListener("click", startsTheGame);
  buttonSet();
  setTimeout(() => cpuPressbuttons(), 3000);
}

//cpu clicks buttons set
function cpuPressbuttons() {
  var arrSet = new Array();
  let started = -1;
  for (let i = 0; i < point; i++) {
    let indexSet = Math.floor(6 * Math.random(1));
    arrSet.push(indexSet);
  }
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
      startsTheGame();
    }
  } else {
    index = 0;
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
  if (time <= 200) time = 200;
  if (obj.style.backgroundColor === color)
    setTimeout(() => (obj.style.backgroundColor = ""), time);
}

function buttonSet() {

  // End Game Button
  const endGame = document.querySelector("#endGame");
  // endGame.innerHTML = "End Game";
  // endGame.id = "endGame";
  // main.appendChild(endGame);
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
      points.innerHTML = "Score Posted!!";
      points.style.fontSize = "32pt";
      points.style.top = "auto";
      document.querySelector("#audioPost").play();
      submitUser(NewUser.value, point - 1);
      setTimeout(() => window.location.reload(), 5000);
    }
  });
}
