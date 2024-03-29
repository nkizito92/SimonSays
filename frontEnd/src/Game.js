class Game {
  static all = [];
  constructor({ id, score, user_id, user }) {
    this.id = id;
    this.score = score;
    this.user_id = user_id;
    this.user = user;

    this.players = document.querySelector("#players");
    this.h2 = document.createElement("h2");
    Game.all.push(this);
  }

  static renderHighscores() {
    let sortedGames = Game.all.sort((a, b) => b.score - a.score);
    sortedGames.forEach(game => {
      game.h2.innerHTML = `${game.user.name}'s score: ${game.score} </br>`;
      game.players.appendChild(game.h2);
    });
  }
}
