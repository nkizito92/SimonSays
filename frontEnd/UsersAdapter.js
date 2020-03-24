class UsersAdapter {
    constructor(baseURL) {
        this.baseURL = baseURL
    }

    fetchUser() {
        fetch(this.baseURL)
            .then(res => res.json())
            .then(user => {
                for (let ply in user) {
                    let newUser = new User(user[ply])
                    newUser.fullyUserRender()
                }
            })
    }
}