let btn = new ButtonsAdapter("http://localhost:3000/buttons");
const main = document.querySelector("main");
const startGame = document.querySelector("#startbtn");
let points = document.querySelector("#points");
let point = 0;
const keyButtons = document.querySelector("#keysbuttons");

// Welcoming
let welcome = document.querySelector("#welcome");
welcome.addEventListener("click", welcoming);
function welcoming() {
  startGame.hidden = true;
  welcome.innerHTML =
    "Press what Simon clicks <br/> Simone's <span style=color:red;>Red</span> and you're <span style=color:green;>green</span>!! <br/><br/> Remembering The Sound is Key!!";
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
      btton[arrSet[started]].querySelector("audio").load();
      btton[arrSet[started]].querySelector("audio").play();
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
  const endGame = document.createElement("button");
  endGame.innerHTML = "End Game";
  endGame.id = "endGame";
  main.appendChild(endGame);
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
  points.hidden = false;
  form.hidden = false;
  document.getElementById("name").focus();
  let yourScore = document.getElementsByName("scored");
  yourScore.hidden = true;
  yourScore.value = point - 1;
}
let createnewUser = new UsersAdapter("http://localhost:3000/users");
createnewUser.fetchUser();
function submitUser(name, scored) {
  fetch("http://localhost:3000/users", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name,
      scored
    })
  })
    .then(res => res.json())
    .then(user => {
      let scoreDisplay = document.querySelector("#players");
      let h1 = document.createElement("h1");
      h1.innerHTML = `${user.name}'s HighScore: ${user.scored}`;
      scoreDisplay.appendChild(h1);
    });
}
// Create user
function createTheUser() {
  const createUser = document.querySelector("#createUser");
  let NewUser = document.querySelector("#name");
  createUser.addEventListener("click", event => {
    event.preventDefault();
    form.hidden = true;
    points.innerHTML = "Score Posted!!";
    points.style.fontSize = "32pt";
    points.style.top = "auto";
    document.querySelector("#audioPost").play();
    submitUser(NewUser.value, point - 1);
    setTimeout(() => window.location.reload(), 5000);
  });
}
