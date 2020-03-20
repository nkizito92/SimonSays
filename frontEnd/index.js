const body = document.querySelector("body");
const main = document.querySelector("main")
const createUser = document.querySelector("#createUser")
const startGame = document.querySelector("#startbtn")

const keyButtons = document.querySelector("#keysbuttons")

function startsTheGame() {
    fetch("http://localhost:3000/games")
        .then(res => res.json())
        .then(game => {
            let gm = document.querySelector("#gm")
            let bestPlayer = gamehightScore(game)[0];
            gm.innerHTML = `${bestPlayer.player}'s HightScore: ${bestPlayer.highscore}`
            startGame.style.display = "Restart Game"
            startGame.removeEventListener('click', startsTheGame)
            buttonSet()
        })
    // cpu clicks buttons and they each blink once
    // you click the same buttons and pass the first level
    // cpu click buttons and adds one more click to follow each level
}

function buttonSet() {
    const restartGame = document.createElement("button")
    restartGame.innerHTML = "Restart Game"
    main.replaceChild(restartGame, startGame)
    for (let i = 0; i < 6; i++) {
        let keyButton = document.createElement("div")
        keyButton.className = "keybutton"
        keyButton.innerHTML = "keys"
        keyButtons.appendChild(keyButton)
        cpuClicksBtn(keyButton)
        // Reset button here
        restartGame.addEventListener('click', () => {
            keyButtons.removeChild(keyButton)
            main.replaceChild(startGame, restartGame)
            startGame.addEventListener("click", startsTheGame)
        })
    }
}

startGame.addEventListener("click", startsTheGame)

function cpuClicksBtn(btn) {
    btn.addEventListener("click", (e) => {
        e.target.style.backgroundColor = "green"
        if (e.target.style.backgroundColor === "green")
            (setTimeout(() => e.target.style.backgroundColor = "#00ffff", 400))
    })
}

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
                if (theHighestScore[i].highscore === null) {
                    h1.innerHTML = "No games played!"
                }
                else {
                    h1.innerHTML = `${player.name}'s HighScore: ${theHighestScore[0].highscore}`
                }
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

let NewUser = document.querySelector("#name")
createUser.addEventListener("click", (e) => {
    submitUser(NewUser.value)
    e.preventDefault()
})