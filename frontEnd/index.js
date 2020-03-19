const body = document.querySelector("body");
const main = document.querySelector("main")

fetch("http://localhost:3000/games")
    .then(res => res.json())
    .then(game => {
        let gm = document.querySelector("#gm")
        let bestPlayer = gamehightScore(game)[0];
        gm.innerHTML = `${bestPlayer.player}'s HightScore: ${bestPlayer.highscore}`
    })


function startGame() {

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

