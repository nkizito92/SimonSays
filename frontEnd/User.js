class User {
    static all = []
    constructor({ id, name, games }) {
        this.id = id
        this.name = name
        this.games = games
        this.highscores = this.games.sort((a, b) => b.highscore - a.highscore)
        this.players = document.querySelector("#players")
        this.point = document.querySelector("#points")
        debugger
        this.h1 = document.createElement("h1")
        User.all.push(this)
    }


    fullyUserRender() {
        this.games.forEach(gm => this.h1.innerHTML = `${this.name}'s HighScore: ${this.highscores[0].highscore}`)
        this.players.appendChild(this.h1)
        return this.players
    }


}