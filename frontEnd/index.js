let btn = new ButtonsAdapter("http://localhost:3000/buttons")

const body = document.querySelector("body");
const main = document.querySelector("main")
const startGame = document.querySelector("#startbtn")
let points = document.querySelector("#points")
let point = 0;
const keyButtons = document.querySelector("#keysbuttons")
let gm = document.querySelector("#gm")

function startsTheGame() {
    fetch("http://localhost:3000/games")
        .then(res => res.json())
        .then(game => {
            if (keyButtons.childElementCount === 0) {
                btn.fetchButtons()
            }
            points.innerHTML = `Score: ${point}`
            point++
            startGame.style.innerHTML = "Restart Game"
            startGame.removeEventListener('click', startsTheGame)
            buttonSet()
            setTimeout(() => cpuPressbuttons(keyButtons), 3000)
        })
}

function cpuPressbuttons(btn) {
    // array set to choose for cpu to press
    btn.removeEventListener("click", clicked)
    let started = -1
    let arrSet = []
    for (let i = 0; (i < point); i++) {
        let indexSet = Math.floor(6 * Math.random(1))
        arrSet.push(indexSet)
    }
    setInterval(() => {
        if (started++ < arrSet.length - 1) {
            let btton = document.querySelectorAll(".keybutton")
            let selectedBtn = btton[arrSet[started]]
            colorToggle(selectedBtn, "red", (200 - (point * 100)))
        } else
            (clearInterval)
    }, (800 - (point * 100)))
    let copiedArr = [...arrSet]
    //user clicks button
    btn.addEventListener("click", (e) => clicked(e, copiedArr))
}

function colorToggle(obj, color, time) {
    obj.style.backgroundColor = color
    if (time <= 200)
        (time = 200)

    if (obj.style.backgroundColor === color)
        (setTimeout(() => obj.style.backgroundColor = "", time))
}

let newArr = []
let index = 0;
let copyArr2 = []
function clicked(e, arr) {
    e.target = document.querySelector(".keybutton")
    colorToggle(e.target, "green", 300)
    const key = parseInt(e.target.id.split("key-")[1]) - 1
    newArr.push(key)
    let copyArr1 = newArr
    copyArr2 = [...arr]
    checkUsersClick(key, copyArr1, copyArr2)
}

function checkUsersClick(key, copyArr1, copyArr2) {
    if (key === copyArr2[index]) {
        index++
        if (copyArr1.length === copyArr2.length) {
            if (copyArr1.join(" ") === copyArr2.join(" ")) {
                index = 0
                newArr = []
                copyArr2 = []
                startsTheGame()
            }
        }
    } else {
        index = 0
        newArr = []
        alert("You Failed Try again")
        userForm()
        let endTheGame = document.createElement("button")
        endTheGame.innerHTML = "End The Game"
        endTheGame.addEventListener("click", () => window.location.reload())
        main.appendChild(endTheGame)
        Button.removeButtons()
        createTheUser()
    }
}
const restartGame = document.createElement("button")
function buttonSet() {
    restartGame.innerHTML = "Restart Game"
    // main.replaceChild(restartGame, startGame)
    // End Game Button
    const endGame = document.createElement("button")
    endGame.innerHTML = "End Game"
    endGame.id = "endGame"
    main.appendChild(endGame)
    endOrRestartGameBtnConfig(endGame)
}

function restartsTheGame() {
    restartGame.addEventListener('click', () => {
        Button.removeButtons()
        setTimeout(() => Button.renderAll(), 400)
    })
}
function endOrRestartGameBtnConfig(endGame) {
    // End Game Event
    endGame.addEventListener("click", () => {
        window.location.reload()
    })
    //Restarts game
    restartsTheGame()
}

startGame.addEventListener("click", startsTheGame)

function hightScore(highscores) {
    return highscores.games.sort((a, b) => b.highscore - a.highscore)
}
function gamehightScore(theBestPlayer) {
    return theBestPlayer.sort((a, b) => b.highscore - a.highscore)
}

function userForm() {
    let form = document.createElement("form")
    let userInput = document.createElement("input")
    userInput.name = "name"
    userInput.id = "name"
    userInput.type = "text"
    userInput.placeholder = "Your Name"

    let yourScore = document.createElement("input")
    yourScore.name = "highscore"
    yourScore.type = "number"
    yourScore.value = point - 1
    yourScore.hidden

    let submitBtn = document.createElement("input")
    submitBtn.name = "submit"
    submitBtn.id = "createUser"
    submitBtn.type = "submit"
    submitBtn.value = "Post Score"
    form.append(userInput, submitBtn, yourScore)
    main.appendChild(form)
}
let createnewUser = new UsersAdapter("http://localhost:3000/users")
createnewUser.fetchUser()
function submitUser(name) {
    fetch("http://localhost:3000/users", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name
        })
    })
        .then(res => res.json())
        .then(user => {
            debugger
        })
}
// Create user
function createTheUser() {
    const createUser = document.querySelector("#createUser")
    let NewUser = document.querySelector("#name")

    createUser.addEventListener("click", (event) => {
        event.preventDefault()
        submitUser(NewUser.value, point)
    })
}