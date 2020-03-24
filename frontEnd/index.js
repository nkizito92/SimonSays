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
        .then(() => {
            if (keyButtons.childElementCount === 0) {
                btn.fetchButtons()
            }
            points.innerHTML = `Score: ${point}`
            point++
            startGame.removeEventListener('click', startsTheGame)
            buttonSet()
            setTimeout(() => cpuPressbuttons(keyButtons), 3000)
        })
}

function cpuPressbuttons(btn) {
    var arrSet = []
    // array set to choose for cpu to press
    let started = -1
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
    }, 500)
    //user clicks button
    keyButtons.addEventListener("click", (e) => clicked(e, arrSet))
}

function colorToggle(obj, color, time) {
    obj.style.backgroundColor = color
    if (time <= 200)
        (time = 200)

    if (obj.style.backgroundColor === color)
        (setTimeout(() => obj.style.backgroundColor = "", time))
}

let index = 0;
let newArr = []
function clicked(e, arr) {
    // e.target = document.querySelector(".keybutton")
    // e.target.querySelector(".keybutton")
    colorToggle(e.target, "green", 300)
    const key = parseInt(e.target.id.split("key-")[1]) - 1
    newArr.push(key)
    let copyArr1 = newArr
    debugger
    let copyArr2 = arr
    checkUsersClick(key, copyArr1, copyArr2)
}

function checkUsersClick(key, copyArr1, copyArr2) {
    if (key === copyArr2[index]) {
        index++
        if (copyArr1.length === copyArr2.length) {
            if (copyArr1.join(" ") === copyArr2.join(" ")) {
                index = 0
                newArr = []
                startsTheGame()
            }
        }
    } else {
        index = 0
        console.log(copyArr2)
        debugger
        newArr = []
        alert("You Failed Try again")
        userForm()
        Button.removeButtons()
        createTheUser()
    }
}
const restartGame = document.createElement("button")
let changeBtn = ""
function buttonSet() {
    restartGame.innerHTML = "Restart Game"

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
    yourScore.name = "scored"
    yourScore.type = "number"
    yourScore.hidden = true
    yourScore.value = point - 1

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
function submitUser(name, scored) {
    fetch("http://localhost:3000/users", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name,
            scored
        })
    })
        .then(res => res.json())
        .then(user => {
            let scoreDisplay = document.querySelector("#players")
            let h1 = document.createElement("h1")
            h1.innerHTML = `${user.name}'s HighScore: ${user.scored}`
            scoreDisplay.appendChild(h1)
        })
}
// Create user
function createTheUser() {
    const createUser = document.querySelector("#createUser")
    let NewUser = document.querySelector("#name")

    createUser.addEventListener("click", (event) => {
        event.preventDefault()
        submitUser(NewUser.value, (point - 1))
        setTimeout(() => window.location.reload(), 5000)
    })
}