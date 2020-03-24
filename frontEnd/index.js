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
            createnewUser.fetchUser()
            // let bestPlayer = gamehightScore(game)[0];
            // gm.innerHTML = `${bestPlayer.user.name}'s HightScore: ${bestPlayer.highscore}`
            points.innerHTML = `Score: ${point}`
            point++
            startGame.style.innerHTML = "Restart Game"
            startGame.removeEventListener('click', startsTheGame)
            buttonSet()
            // userClicksBtn(keyButtons)
            setTimeout(() => cpuPressbuttons(keyButtons), 3000)

        })
    // cpu clicks buttons and they each blink once
    // you click the same buttons and pass the first level
    // cpu click buttons and adds one more click to follow each level
}

function cpuPressbuttons(btn) {
    // array set to choose for cpu to press
    let started = -1
    let arrSet = []
    for (let i = 0; i < 3; i++) {
        let indexSet = Math.floor(6 * Math.random(1))
        arrSet.push(indexSet)
    }
    setInterval(() => {
        if (started++ < arrSet.length - 1) {
            let btton = document.querySelectorAll(".keybutton")
            let selectedBtn = btton[arrSet[started]]
            colorToggle(selectedBtn, "red", 500)
        } else
            (clearInterval)
    }, 600)
    //user clicks button
    btn.addEventListener("click", (e) => clicked(e, arrSet))
}

function colorToggle(obj, color, time) {
    obj.style.backgroundColor = color
    if (obj.style.backgroundColor === color)
        (setTimeout(() => obj.style.backgroundColor = "", time))
}

let newArr = []
let index = 0;
function clicked(e, arr) {
    e.target = document.querySelector(".keybutton")
    colorToggle(e.target, "green", 300)
    const key = parseInt(e.target.id.split("key-")[1]) - 1
    newArr.push(key)
    let copyArr1 = newArr
    const copyArr2 = arr
    if (key === arr[index]) {
        index++
        if (copyArr1.length === copyArr2.length) {
            if (copyArr1.join(" ") === copyArr2.join(" ")) {
                index = 0
                newArr = []
                keyButtons.removeEventListener("click", clicked)
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
        // setTimeout(() => window.location.reload(), 12000)
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
        // Button.removeButtons()
        // main.removeChild(endGame)
        // main.replaceChild(startGame, restartGame)
        // startGame.addEventListener("click", startsTheGame)
        // gm.innerHTML = ""
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
// function displayScores() {
//     fetch("http://localhost:3000/users")
//         .then(res => res.json())
//         .then(user => {
//             user.forEach(player => {
//                 let theHighestScore = hightScore(player)
//                 let h1 = document.createElement("h1")
//                 for (let i = 0; i < theHighestScore.length; i++) {
//                     if (theHighestScore[i].highscore === null)
//                         (h1.innerHTML = "No games played!")
//                     else
//                         (h1.innerHTML = `${player.name}'s HighScore: ${theHighestScore[0].highscore}`)
//                 }
//                 let div = document.querySelector('#players')
//                 let theUser = document.createElement("div");
//                 theUser.className = "user"
//                 theUser.innerHTML = `${player.name}`
//                 div.append(theUser)
//                 theUser.append(h1)
//             })
//         })
// }

// displayScores()
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