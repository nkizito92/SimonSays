let btn = new ButtonsAdapter("http://localhost:3000/buttons");
const body = document.querySelector("body");
const main = document.querySelector("main");
const startGame = document.querySelector("#startbtn");
let points = document.querySelector("#points");
let point = 0;
const keyButtons = document.querySelector("#keysbuttons");
let gm = document.querySelector("#gm");

// player and buttons set.
let plyrSelectedBtns = [];
let compArrSet = [];
let checkIndex = 0;
function startsTheGame() {
    startGame.hidden = true
    fetch("http://localhost:3000/games")
        .then(res => res.json())
        .then(() => {
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
        });
}
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
            btton[arrSet[started]].querySelector("audio").load()
            btton[arrSet[started]].querySelector("audio").play()
            colorToggle(selectedBtn, "red", (900 - (point * 100)));
        } else clearInterval;
    }, 500);
}
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
        failedGame()
    }
}

function failedGame() {
    let failed = document.querySelector("#failed")
    failed.innerHTML = "Wrong Button <br/> GameOver!!"
    Button.removeButtons();
    document.querySelector("#failSound").play()
    points.hidden = true
    setTimeout(() => {
        failed.hidden = true
        userForm();
        createTheUser();
    }, 3000)
}


keyButtons.addEventListener("click", e => {
    e.target.querySelector("audio").load()
    e.target.querySelector("audio").play()
    clicked(e, compArrSet)
});
function colorToggle(obj, color, time) {
    obj.style.backgroundColor = color;
    if (time <= 200)
        (time = 200)
    if (obj.style.backgroundColor === color)
        setTimeout(() => (obj.style.backgroundColor = ""), time);
}
const restartGame = document.createElement("button");
let changeBtn = "";
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
    document.querySelector("#startGame").play()
    startsTheGame()
});
function hightScore(highscores) {
    return highscores.games.sort((a, b) => b.highscore - a.highscore);
}
function gamehightScore(theBestPlayer) {
    return theBestPlayer.sort((a, b) => b.highscore - a.highscore);
}
function userForm() {
    points.hidden = false
    let form = document.createElement("form");
    let userInput = document.createElement("input");
    userInput.name = "name";
    userInput.id = "name";
    userInput.type = "text";
    userInput.placeholder = "Your Name";
    let yourScore = document.createElement("input");
    yourScore.name = "scored";
    yourScore.type = "number";
    yourScore.hidden = true;
    yourScore.value = point - 1;
    let submitBtn = document.createElement("input");
    submitBtn.name = "submit";
    submitBtn.id = "createUser";
    submitBtn.type = "submit";
    submitBtn.value = "Post Score";
    form.append(userInput, submitBtn, yourScore);
    main.appendChild(form);
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
        document.querySelector("form").hidden = true
        document.querySelector("#audioPost").play()
        submitUser(NewUser.value, point - 1);
        setTimeout(() => window.location.reload(), 5000);
    });
}