let btn = new ButtonsAdapter("http://localhost:3000/buttons")

const body = document.querySelector("body");
const main = document.querySelector("main")
const createUser = document.querySelector("#createUser")
const startGame = document.querySelector("#startbtn")

const keyButtons = document.querySelector("#keysbuttons")
let gm = document.querySelector("#gm")

function startsTheGame() {
    fetch("http://localhost:3000/games")
        .then(res => res.json())
        .then(game => {
            if (keyButtons.childElementCount === 0) {
                btn.fetchButtons()
            }
            let bestPlayer = gamehightScore(game)[0];
            gm.innerHTML = `${bestPlayer.user.name}'s HightScore: ${bestPlayer.highscore}`
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
    for (let i = 0; i < 1; i++) {
        let indexSet = Math.floor(6 * Math.random(1))
        arrSet.push(indexSet)
    }
    setInterval(() => {
        if (started++ < arrSet.length - 1) {
            let btton = document.querySelectorAll(".keybutton")
            debugger
            let selectedBtn = btton[arrSet[started]]
            colorToggle(selectedBtn, "red", 500)
        } else
            (clearInterval)
    }, 600)
    userClicksBtn(arrSet, btn)

}

function colorToggle(obj, color, time) {
    obj.style.backgroundColor = color
    if (obj.style.backgroundColor === color)
        (setTimeout(() => obj.style.backgroundColor = "", time))
}
// user clicks the button
function userClicksBtn(arr, btn) {
    btn.addEventListener("click", (e) => {
        e.target = document.querySelector(".keybutton")
        colorToggle(e.target, "green", 300)
        const key = parseInt(e.target.id.split("key-")[1]) - 1
        let index = 0;
        if (key === arr[index]) {
            index++
            if (index === arr.length) {
                index = 0
                startsTheGame()
            }
        } else {
            index = 0
        }
    })
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

fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(user => {
        user.forEach(player => {
            let theHighestScore = hightScore(player)
            let h1 = document.createElement("h1")
            for (let i = 0; i < theHighestScore.length; i++) {
                if (theHighestScore[i].highscore === null)
                    (h1.innerHTML = "No games played!")
                else
                    (h1.innerHTML = `${player.name}'s HighScore: ${theHighestScore[0].highscore}`)
            }
            let div = document.querySelector('#players')
            let user = document.createElement("div");
            user.className = "user"
            user.innerHTML = `${player.name}`
            div.append(user)
            user.append(h1)
        })
    })

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
        .then(user => console.log(user))
}
// Create user 
let NewUser = document.querySelector("#name")
createUser.addEventListener("click", (e) => {
    submitUser(NewUser.value)
    e.preventDefault()
})

