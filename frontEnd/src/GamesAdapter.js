class GamesAdapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  fetchGames() {
    fetch(this.baseURL)
      .then(res => res.json())
      .then(games => {
        for (let game in games) {
          new Game(games[game]);
        }
        Game.renderHighscores();
      });
  }
}
