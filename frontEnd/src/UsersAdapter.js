class UsersAdapter {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  fetchScore(name, scored) {
    let configObj = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        name,
        scored
      })
    };

    fetch(this.baseURL, configObj)
      .then(res => res.json())
      .then(newUser => {
        let user = new User(newUser);
        user.postScore();
      });
  }
}
