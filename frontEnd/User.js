class User {
    static all = []
    constructor({ id, name, games }) {
        this.id = id
        this.name = name
        this.games = games
        this.highscores = this.games.sort((a, b) => b.highscore - a.highscore)
        this.players = document.querySelector("#players")
        this.point = document.querySelector("#points")
        this.h1 = document.createElement("h1")
        User.all.push(this)
    }

    fullyUserRender() {
        this.games.forEach(() => {
            if (this.highscores[0].highscore !== null)
                (this.h1.innerHTML = `${this.name}'s HighScore: ${this.highscores[0].highscore}</br> </br>`)
            else
                (this.h1.innerHTML = `${this.name}'s HighScore: No game has been played </br> </br>`)
        })
        this.players.appendChild(this.h1)
        return this.players
    }

}