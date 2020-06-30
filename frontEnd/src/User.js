class User {
  static all = [];
  constructor({ id, name, highscore, games }) {
    this.id = id;
    this.name = name;
    this.games = games;
    this.highscore = highscore;

    this.players = document.querySelector("#players");
    this.youScored = document.querySelector("#yourScore");
    this.h1 = document.createElement("h1");
    User.all.push(this);
  }

  postScore() {
    this.h1.innerHTML = `${this.name}'s HighScore: ${this.highscore} </br> </br>`;
    this.players.appendChild(this.h1);
    this.youScored.appendChild(this.h1);
    return (this.players,
      this.youScored
    )
  }
}
